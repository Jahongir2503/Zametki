new Vue({
    el: '#app',
    data() {
        return {
            firstColumn: [],
            secondColumn: [],
            thirdColumn: [],
            note: {
                eventName: '',
                taskName: [
                    {id: 1, text: '', completed: false},
                    {id: 2, text: '', completed: false},
                    {id: 3, text: '', completed: false}
                ],
            },
            error: '',
        }
    },
    mounted() {
        if (localStorage.getItem('firstColumn')) {
            try {
                this.firstColumn = JSON.parse(localStorage.getItem('firstColumn'));
            } catch(e) {
                localStorage.removeItem('firstColumn');
            }
        }
        if (localStorage.getItem('secondColumn')) {
            try {
                this.secondColumn = JSON.parse(localStorage.getItem('secondColumn'));
            } catch(e) {
                localStorage.removeItem('secondColumn');
            }
        }
        if (localStorage.getItem('thirdColumn')) {
            try {
                this.thirdColumn = JSON.parse(localStorage.getItem('thirdColumn'));
            } catch(e) {
                localStorage.removeItem('thirdColumn');
            }
        }
    },
    methods: {
        handleNotePosition(note) {
            const completedTasks = note.taskName.filter(task => task.completed).length;
            const completionPercentage = (completedTasks / note.taskName.length) * 100;

            if (completionPercentage >= 50 && this.firstColumn.includes(note)) {
                if(this.secondColumn.length === 5 && completionPercentage >= 50 && this.firstColumn.includes(note)){
                    this.error = 'The second column is full and at least one note in the first column has more than 50% completed tasks.';
                    return;
                } else {
                    this.firstColumn.splice(this.firstColumn.indexOf(note), 1);
                    this.secondColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                    this.saveLocalStorage();
                }
            } else if (completionPercentage === 100 && this.secondColumn.includes(note)) {
                this.secondColumn.splice(this.secondColumn.indexOf(note), 1);
                note.completedDate = new Date().toLocaleString();
                this.thirdColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                this.saveLocalStorage();
            }
        },
        addNote() {
            if (this.note.eventName === '') {
                this.error = 'The name of the Note has not been entered';
                return;
            } else if (this.note.taskName.some(task => task.text === '')) {
                this.error = 'Enter the task!';
                return;
            }
            this.error = '';

            this.firstColumn.push({
                event: this.note.eventName,
                taskName: this.note.taskName.map(task => ({...task})),
                completedDate: null,
            });

            this.note.eventName = '';
            this.note.taskName = [
                {id: 1, text: '', completed: false},
                {id: 2, text: '', completed: false},
                {id: 3, text: '', completed: false}
            ];

            this.handleNotePosition(this.firstColumn[this.firstColumn.length - 1]);
        },
        addTaskRow() {
            if (this.note.taskName.length < 5) {
                this.note.taskName.push({id: this.note.taskName.length + 1, text: '', completed: false});
            }
        },
        updateNoteStatus(note, columnIndex, noteIndex) {
            const completedTasks = note.taskName.filter(task => task.completed).length;
            const completionPercentage = (completedTasks / note.taskName.length) * 100;

            if (completionPercentage >= 50 && columnIndex === 1) {
                if(this.secondColumn.length === 5 && completionPercentage >= 50){
                    this.error = 'The second column is full and at least one note in the first column has more than 50% completed tasks.';
                    return;
                } else {
                    this.firstColumn.splice(noteIndex, 1);
                    this.secondColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                    this.saveLocalStorage();
                }
            }

            if (completionPercentage === 100 && columnIndex === 2) {
                note.completedDate = new Date().toLocaleString();
                this.thirdColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                this.secondColumn.splice(noteIndex, 1);
                this.saveLocalStorage();
            }
        },
        saveLocalStorage() {
            const notesAppData = {
                firstColumn: this.firstColumn,
                secondColumn: this.secondColumn,
                thirdColumn: this.thirdColumn,
            };
            localStorage.setItem('firstColumn', JSON.stringify(notesAppData.firstColumn));
            localStorage.setItem('secondColumn', JSON.stringify(notesAppData.secondColumn));
            localStorage.setItem('thirdColumn', JSON.stringify(notesAppData.thirdColumn));
        },
    },
    watch: {
        firstColumn: {
            handler: function () {
                this.saveLocalStorage();
            },
            deep: true
        },
        secondColumn: {
            handler: function () {
                this.saveLocalStorage();
            },
            deep: true
        },
        thirdColumn: {
            handler: function () {
                this.saveLocalStorage();
            },
            deep: true
        },
    },
});
