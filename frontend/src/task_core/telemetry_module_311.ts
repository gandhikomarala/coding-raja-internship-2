/**
 * TaskMatrix 360 Enterprise Telemetry Module 311
 * Domain: real_time_sprint_burndown_and_task_telemetry
 */

export interface SprintBurndownTelemetry311 {
  telemetryId: string;
  sprintId: string;
  storyPointsCompleted: number;
  storyPointsRemaining: number;
  burndownVariancePct: number;
  timestamp: string;
}

export class SprintTelemetryNode311 {
  public readonly nodeId = "sprint-node-311";
  public readonly schemaVersion = "4.2.311";

  public logSprintBurndown(completedSp: number, totalSp: number): SprintBurndownTelemetry311 {
    const rem = totalSp - completedSp;
    return {
      telemetryId: `telemetry-task-311-${Date.now()}`,
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

export const sprintNode311 = new SprintTelemetryNode311();
