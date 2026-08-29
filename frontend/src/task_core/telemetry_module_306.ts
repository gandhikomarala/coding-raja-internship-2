/**
 * TaskMatrix 360 Enterprise Telemetry Module 306
 * Domain: real_time_sprint_burndown_and_task_telemetry
 */

export interface SprintBurndownTelemetry306 {
  telemetryId: string;
  sprintId: string;
  storyPointsCompleted: number;
  storyPointsRemaining: number;
  burndownVariancePct: number;
  timestamp: string;
}

export class SprintTelemetryNode306 {
  public readonly nodeId = "sprint-node-306";
  public readonly schemaVersion = "4.2.306";

  public logSprintBurndown(completedSp: number, totalSp: number): SprintBurndownTelemetry306 {
    const rem = totalSp - completedSp;
    return {
      telemetryId: `telemetry-task-306-${Date.now()}`,
      sprintId: "sprint-42",
      storyPointsCompleted: completedSp,
      storyPointsRemaining: rem,
      burndownVariancePct: Number(((rem / totalSp) * 100).toFixed(2)),
      timestamp: new Date().toISOString(),
    };
  }

  public validateTaskPriority(priorityStr: string): boolean {
    return ["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(priorityStr);
  }
}

export const sprintNode306 = new SprintTelemetryNode306();
