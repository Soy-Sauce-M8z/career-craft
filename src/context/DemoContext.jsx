import React, { createContext, useState, useContext, useEffect } from 'react';

const DemoContext = createContext();

// Mock Initial State
const initialStudentState = {
  name: 'Jordan Lee',
  persona: 'student',
  level: 3,
  xp: 450,
  xpToNext: 1000,
  skills: {
    cybersecurity: { level: 4, modifier: '+4' },
    programming: { level: 2, modifier: '+2' },
    networking: { level: 1, modifier: '+1' },
  },
  resumeAnalysis: {
    strengths: ['Programming logic', 'Basic scripting'],
    gaps: ['Networking fundamentals', 'Linux command line', 'Vulnerability assessment'],
    recommendedPath: 'Cybersecurity Analyst Path',
    recommendedCourses: ['Linux Foundations', 'Network Security', 'Penetration Testing']
  },
  activeMission: null,
  completedMissions: ['Intro to Terminal', 'Basic Phishing Hunt'],
  insightsLoaded: false,
};
const initialMentorState = {
  name: 'Alex Chen',
  persona: 'mentor',
  role: 'Senior Cybersecurity Engineer',
  mentees: [
    { id: 'm1', name: 'Jordan Lee', role: 'Cybersecurity Student', status: 'active', recentSubmission: 'Investigate a Suspicious Login' }
  ],
  pendingRequests: [
    { id: 'p1', name: 'Sam Taylor', role: 'Frontend Developer', message: 'Looking to learn secure coding practices.' },
    { id: 'p2', name: 'Casey Smith', role: 'Data Science', message: 'Id love guidance on data privacy.' }
  ],
  questBoard: [
    {
      id: 'q1',
      title: 'Junior Security Analyst Intern',
      company: 'CyberShield Corp',
      type: 'Internship',
      description: 'Looking for a passionate learner to assist with log monitoring and basic vulnerability scans.',
      recommendedMentees: []
    }
  ]
};

const teamData = {
  mission: 'Secure the Startup',
  members: [
    { id: 1, name: 'Jordan Lee', role: 'Cybersecurity Analyst', location: 'San Francisco, CA', timezone: 'PST', skills: ['Cybersecurity', 'Networking'], lat: 37.7749, lng: -122.4194 },
    { id: 2, name: 'Taylor Swift', role: 'Software Developer', location: 'Austin, TX', timezone: 'CST', skills: ['Programming', 'System Design'], lat: 30.2672, lng: -97.7431 },
    { id: 3, name: 'Morgan Doe', role: 'Product Manager', location: 'New York, NY', timezone: 'EST', skills: ['Product Strategy', 'User Research'], lat: 40.7128, lng: -74.0060 }
  ]
};

export const DemoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 'student' or 'mentor'
  const [student, setStudent] = useState(initialStudentState);
  const [mentor, setMentor] = useState(initialMentorState);
  const [currentView, setCurrentView] = useState('login'); // login, dashboard, mission, team_lobby
  const [activeMissionData, setActiveMissionData] = useState(null);
  const [activePortfolio, setActivePortfolio] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loginAs = (persona) => {
    setCurrentUser(persona);
    setCurrentView('dashboard');
  };

  const viewStudentPortfolio = (studentId) => {
    const mentee = mentor.mentees.find(m => m.id === studentId);
    if (mentee) {
      setActivePortfolio(mentee);
      setCurrentView('portfolio');
    }
  };

  const startMission = (missionId) => {
    setActiveMissionData({
      id: missionId,
      title: 'Investigate a Suspicious Login',
      tasks: ['Open terminal', 'Check logs', 'Identify IP', 'Block IP'],
      currentTaskIndex: 0,
      isComplete: false
    });
    setCurrentView('mission');
  };

  const completeTask = () => {
    if (!activeMissionData) return;
    const nextIndex = activeMissionData.currentTaskIndex + 1;
    if (nextIndex >= activeMissionData.tasks.length) {
      setActiveMissionData({ ...activeMissionData, isComplete: true, currentTaskIndex: nextIndex });
      addXP(500);
    } else {
      setActiveMissionData({ ...activeMissionData, currentTaskIndex: nextIndex });
    }
  };

  const addXP = (amount) => {
    setStudent(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNext;
      
      if (newXp >= prev.xpToNext) {
        newLevel += 1;
        newXp = newXp - prev.xpToNext;
        newXpToNext = Math.floor(prev.xpToNext * 1.5);
      }
      return { ...prev, xp: newXp, level: newLevel, xpToNext: newXpToNext };
    });
  };

  const approveMentee = (id) => {
    setMentor(prev => {
      const request = prev.pendingRequests.find(req => req.id === id);
      if (!request) return prev;
      return {
        ...prev,
        pendingRequests: prev.pendingRequests.filter(req => req.id !== id),
        mentees: [...prev.mentees, { ...request, status: 'active', recentSubmission: null }]
      };
    });
  };

  const rejectMentee = (id) => {
    setMentor(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter(req => req.id !== id)
    }));
  };

  const addQuestPosting = (questData) => {
    setMentor(prev => ({
      ...prev,
      questBoard: [
        {
          id: `q${Date.now()}`,
          ...questData,
          recommendedMentees: []
        },
        ...prev.questBoard
      ]
    }));
  };

  const recommendMenteeForQuest = (questId, menteeId) => {
    setMentor(prev => {
      const updatedQuests = prev.questBoard.map(quest => {
        if (quest.id === questId && !quest.recommendedMentees.includes(menteeId)) {
          return {
            ...quest,
            recommendedMentees: [...quest.recommendedMentees, menteeId]
          };
        }
        return quest;
      });
      return { ...prev, questBoard: updatedQuests };
    });
  };

  const value = {
    currentUser,
    loginAs,
    currentView,
    setCurrentView,
    student,
    setStudent,
    mentor,
    startMission,
    activeMissionData,
    completeTask,
    addXP,
    teamData,
    approveMentee,
    rejectMentee,
    viewStudentPortfolio,
    activePortfolio,
    addQuestPosting,
    recommendMenteeForQuest,
    theme,
    toggleTheme
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export const useDemo = () => useContext(DemoContext);
