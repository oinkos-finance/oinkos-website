export const lineChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Steps",
      data: [1, 21, 4, 51, 100],
      borderColor: "rgb(0, 100, 100)",
    },
    {
      label: "Steps1",
      data: [1, 11, 100, 50, 90],
      borderColor: "#443332",
    },
  ],
};

export const barChartData = {
  labels: ["a", "b", "c", "d", "e"],
  datasets: [
    {
      label: "Expenses",
      data: [120, 200, 1020, 400, 200],
      backgroundColor: ["red", "blue", "yellow", "green"],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
};

export const pieChartData = {
  labels: ["a", "b", "c", "d", "e"],
  datasets: [
    {
      label: "Expenses",
      data: [120, 200, 1020, 400, 200],
      backgroundColor: ["red", "blue", "yellow", "green"],
      borderColor: "black",
      hoverOffset: 2,
    },
  ],
};
