<template>
  <div>
    <Gantt
      :tasks="tasks"
      :viewMode="view"
      :onDateChange="handleTaskChange"
      :onDelete="handleTaskDelete"
      :onProgressChange="handleProgressChange"
      :onDoubleClick="handleDblClick"
      :onClick="handleClick"
      :onSelect="handleSelect"
      :onExpanderClick="handleExpanderClick"
      listCellWidth="155px"
      :columnWidth="columnWidth"
    />
  </div>
</template>

<script>
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption
} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {ReactInVue} from 'vuera';

function initTasks() {
  const currentDate = new Date();
  const tasks = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "project",
      project: "ProjectSample",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      // dependencies: ["Task 0"],
      type: "task",
      project: "Task 0",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Project",
      id: "Project",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 8,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Taskn",
      id: "Taskn",
      progress: 45,
      type: "task",
      project: "Project",
      displayOrder: 9,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Taskn1",
      id: "Taskn1",
      progress: 45,
      type: "task",
      project: "Project",
      displayOrder: 10,
      dependencies: ["Taskn"],
    },
  ];
  return tasks;
}

function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

export default {
  data() {
    return {
      tasks: initTasks(),
      view: ViewMode.Day,
      columnWidth: 65,
      isChecked: false
    }
  },
  components: {
    Gantt: ReactInVue(Gantt)
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.view === ViewMode.Year) {
        this.columnWidth = 350;
      } else if (this.view === ViewMode.Month) {
        this.columnWidth = 300;
      } else if (this.view === ViewMode.Week) {
        this.columnWidth = 250;
      }
    },
    handleTaskChange(task) {
      console.log("On date change Id:" + task.id);
      let newTasks = this.tasks.map(t => (t.id === task.id ? task : t));
      if (task.project) {
        const [start, end] = getStartEndDateForProject(newTasks, task.project);
        const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
        if (
          project.start.getTime() !== start.getTime() ||
          project.end.getTime() !== end.getTime()
        ) {
          const changedProject = {...project, start, end};
          newTasks = newTasks.map(t =>
            t.id === task.project ? changedProject : t
          );
        }
      }
      this.$set(this, 'tasks', newTasks)
    },
    handleTaskDelete(task) {
      const conf = window.confirm("Are you sure about " + task.name + " ?");
      if (conf) {
        this.$set(this, 'tasks', this.tasks.filter(t => t.id !== task.id))
      }
      return conf;
    },

    async handleProgressChange(task) {
      this.$set(this, 'tasks', this.tasks.map(t => (t.id === task.id ? task : t)))
      console.log("On progress change Id:" + task.id);
    },

    handleDblClick(task) {
      alert("On Double Click event Id:" + task.id);
    },

    handleClick(task) {
      console.log("On Click event Id:" + task.id);
    },

    handleSelect(task, isSelected) {
      console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    },

    handleExpanderClick(task) {
      this.$set(this, 'tasks', this.tasks.map(t => (t.id === task.id ? task : t)))
      console.log("On expander click Id:" + task.id);
    }
  }
}
</script>

<style scoped>

</style>
