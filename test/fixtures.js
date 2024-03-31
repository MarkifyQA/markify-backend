export const serviceUrl = "http://localhost:3000";

export const testUser = {
  firstName: "Test",
  lastName: "User",
  email: "Test@user.com",
  password: "12345678",
};

export const testUsers = [
  {
    firstName: "Tom",
    lastName: "Brady",
    email: "tom@brady.com",
    password: "secret123",
  },
  {
    firstName: "Payton",
    lastName: "Manning",
    email: "payton@manning.com",
    password: "secret123",
  },
  {
    firstName: "Colin",
    lastName: "Farrell",
    email: "coling@farrell.com",
    password: "secret123",
  },
];

export const testTeam = {
  teamName: "Single Test Team",
};

export const testTeams = [
  {
    teamName: "Team 1",
  },
  {
    teamName: "Team 2",
  },
  {
    teamName: "Team 3",
  },
];

export const testEmployee = {
  firstName: "test",
  lastName: "employee",
  email: "test@employee.com",
  supervisor: "Test Supervisor",
};

export const testEmployees = [
  {
    firstName: "test",
    lastName: "employee one",
    email: "test@employee1.com",
    supervisor: "Test Supervisor one",
  },
  {
    firstName: "test",
    lastName: "employee two",
    email: "test@employee2.com",
    supervisor: "Test Supervisor two",
  },
  {
    firstName: "test",
    lastName: "employee three",
    email: "test@employee3.com",
    supervisor: "Test Supervisor three",
  },
];

export const testUserCredentials = {
  email: "Test@user.com",
  password: "12345678",
};

export const testScorecard = {
  title: "Customer Service Scorecard",
  questions: [
    {
      text: "Did the right opening get used?",
      answers: ["Yes", "No"],
      score: 1,
    },
    {
      text: "Did the account get updated?",
      answers: ["Yes", "No"],
      score: 1,
    },
  ],
};

export const testResult = {
  answers: [
    {
      text: "Yes",
    },
    {
      text: "No",
    },
  ],
  totalScore: 1,
  sumScore: 2,
  percentScore: 50,
  reference: "Test Result",
};
