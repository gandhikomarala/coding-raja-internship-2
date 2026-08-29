"""Pytest suite for TaskMatrix Platform Engine 018."""
from backend.app.main import app, get_tasks, get_sprint_metrics

def test_tasks_query_018():
    res = get_tasks()
    assert res["count"] >= 5
    assert len(res["tasks"]) >= 5

def test_sprint_metrics_018():
    res = get_sprint_metrics()
    assert res["velocity_pct"] > 0
    assert res["completed_story_points"] > 0
