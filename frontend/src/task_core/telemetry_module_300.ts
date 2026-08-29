/**
 * TaskMatrix 360 Enterprise Telemetry Module 300
 * Domain: real_time_sprint_burndown_and_task_telemetry
 */

export interface SprintBurndownTelemetry300 {
  telemetryId: string;
  sprintId: string;
  storyPointsCompleted: number;
  storyPointsRemaining: number;
  burndownVariancePct: number;
  timestamp: string;
}

export class SprintTelemetryNode300 {
  public readonly nodeId = "sprint-node-300";
  public readonly schemaVersion = "4.2.300";

  public logSprintBurndown(completedSp: number, totalSp: number): SprintBurndownTelemetry300 {
    const rem = totalSp - completedSp;
    return {
      telemetryId: `telemetry-task-300-${Date.now()}`,
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

export const sprintNode300 = new SprintTelemetryNode300();
