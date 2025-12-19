export const mapTaskNames = (taskName: string): string[] => {
  return taskName
    .split('\n')
    .flatMap((line) =>
      line
        .split(',')
        .map((task) => task.trim())
        .filter((task) => task.length > 0),
    )
    .filter((task) => task.length > 0);
};
