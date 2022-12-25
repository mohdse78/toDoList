import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import * as confetti from 'canvas-confetti';


@Component({
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ToDoListComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
  }


  title = 'toDoList';
  dateValue = new FormControl();
  priority: any = [
    {id: 1, name: 'زیاد', code: 'rgba(255,0,0,0.2)'},
    {id: 2, name: 'متوسط', code: 'rgba(255,255,0,0.5)'},
    {id: 3, name: 'کم', code: 'rgba(0,128,0,0.5)'}
  ];
  removeObject: any = {};
  doneDuty: any = {};
  addNewDuty: boolean = false;
  editDoing: boolean = false;
  newDuty: any = {};
  editMode: boolean = false;
  selectedDuty!: number;
  selectedDoingTask!: number;
  display: boolean = false;
  dutyDraggedCart: any;
  doingDraggedCart: any;
  doneDraggedCart: any;
  dutyDraggedCartId: any;
  doingDraggedCartId: any;
  doneDraggedCartId: any;
  prioritySelected: any;
  innerWidth: any= false;
  mobileSize: boolean= false;


  duties: { id: number, title: string, description: string, date: string, priority: { id: number, name: string, code: string } }[] = []
  doing: { id: number, title: string, description: string, date: string, priority: { id: number, name: string, code: string } }[] = []
  done: { id: number, title: string, description: string, date: string, priority: { id: number, name: string, code: string } }[] = []


  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1024) {
      this.mobileSize = true
    }


    this.newDuty = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      priority: [{
        id: 0,
        name: [''],
        code: ['']
      }, [Validators.required]
      ],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })

    if (localStorage.getItem('duties'))
      this.duties = this.duties.concat(JSON.parse(<string>localStorage.getItem('duties')));

    if (localStorage.getItem('doing'))
      this.doing = this.doing.concat(JSON.parse(<string>localStorage.getItem('doing')));

    if (localStorage.getItem('done'))
      this.done = this.done.concat(JSON.parse(<string>localStorage.getItem('done')));

  }

  confirmDutyDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: (event.target as HTMLInputElement),
      message: 'از حذف این وظیفه اطمینان دارید؟',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeObject = this.duties.findIndex(x => x.id == id);
        this.duties.splice(this.removeObject, 1);
        localStorage.removeItem('duties');
        localStorage.setItem('duties', JSON.stringify(this.duties));
        this.removeObject = null;
        this.messageService.add({severity: 'info', summary: 'تایید', detail: 'عملیات حذف انجام شد'});
      }
      ,
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'لغو', detail: 'عملیات حذف لغو شد'});
      }
    });
  }


  confirmDoingDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: (event.target as HTMLInputElement),
      message: 'از حذف این وظیفه اطمینان دارید؟',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeObject = this.doing.findIndex(x => x.id == id);
        this.doing.splice(this.removeObject, 1);

        localStorage.removeItem('doing');
        localStorage.setItem('doing', JSON.stringify(this.doing));

        this.removeObject = null;
        this.messageService.add({severity: 'info', summary: 'تایید', detail: 'عملیات حذف انجام شد'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'لغو', detail: 'عملیات حذف لغو شد'});
      }
    });
  }


  confirmDoneDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: (event.target as HTMLInputElement),
      message: 'از حذف این وظیفه اطمینان دارید؟',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeObject = this.done.findIndex(x => x.id == id);
        this.done.splice(this.removeObject, 1);

        localStorage.removeItem('done');
        localStorage.setItem('done', JSON.stringify(this.done));

        this.removeObject = null;
        this.messageService.add({severity: 'info', summary: 'تایید', detail: 'عملیات حذف انجام شد'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'لغو', detail: 'عملیات حذف لغو شد'});
      }
    });
  }


  addDuty() {
    this.addNewDuty = true;
    this.newDuty.reset();
    this.newDuty.get('id').setValue(this.duties.length ? this.duties[this.duties.length - 1].id + 1 : 1);
  }

  addNewTask() {
    if (this.newDuty.valid) {
      let allDuties: any = [];

      if (localStorage.getItem('duties')) {
        allDuties = JSON.parse(<string>localStorage.getItem('duties'));
        if (this.editMode) {
          allDuties.splice(this.selectedDuty, 1);
          this.duties.splice(this.selectedDuty, 1);
        }
      }
      this.duties.push(this.newDuty.value);
      allDuties.push(this.newDuty.value);

      localStorage.removeItem('duties');
      localStorage.setItem('duties', JSON.stringify(allDuties));

      this.addNewDuty = false;
      this.editMode = false;
      this.newDuty.reset();
      this.messageService.add({
        summary: 'موفق',
        severity: 'success',
        detail: 'لیست وظایف به روز رسانی شد'
      })
    } else {
      this.messageService.add({
        summary: 'خطا',
        severity: 'error',
        detail: 'اطلاعات را به درستی وارد کنید',
      })
    }
  }


  edit(id: number) {
    this.editMode = true;
    this.addNewDuty = true;
    let editItem: any;
    editItem = this.duties.find(x => x.id === id);
    this.selectedDuty = this.duties.findIndex(x => x.id === id);
    this.newDuty.patchValue(editItem);
    this.newDuty.get('priority').setValue(editItem.priority);
  }

  editDoingTask(id: number) {
    this.editDoing = true;
    let editItem: any;
    this.selectedDoingTask = this.doing.findIndex(x => x.id === id);
    editItem = this.doing.find(x => x.id == id);
    this.newDuty.patchValue(editItem);
  }

  submitDoingTask() {
    let doingCards: any = [];
    doingCards = JSON.parse(<string>localStorage.getItem('doing'));
    doingCards.splice(this.selectedDoingTask, 1);
    this.doing.splice(this.selectedDoingTask, 1);


    this.doing.push(this.newDuty.value);
    doingCards.push(this.newDuty.value);

    localStorage.removeItem('doing');
    localStorage.setItem('doing', JSON.stringify(doingCards));

    this.editDoing = false;
  }

  cancel() {
    this.addNewDuty = false;
    this.newDuty.reset();
    this.editMode = false;
    this.messageService.add({
      summary: 'انصراف',
      severity: 'warning',
      detail: 'عملیات لغو شد',

    })
  }

  cancelDoingTask() {
    this.editDoing = false;
  }


  dutyDragStart(id: number) {
    this.duties.find((x: any) => {
      if (x.id === id) {
        this.dutyDraggedCart = x;
      }
    });
    this.dutyDraggedCartId = this.duties.findIndex(x => x.id === id);
  }

  dutyDragEnd() {
    this.dutyDraggedCart = null;

  }

  dropDuty() {
    if (this.doneDraggedCart) {
      this.done.splice(this.doneDraggedCartId, 1);
      localStorage.removeItem('done');
      localStorage.setItem('done', JSON.stringify(this.done));

      this.doneDraggedCart.id = this.duties.length ? this.duties[this.duties.length - 1].id + 1 : 1;
      this.duties.push(this.doneDraggedCart);

      localStorage.removeItem('duties');
      localStorage.setItem('duties', JSON.stringify(this.duties));

      this.doneDraggedCart = null;
    } else if (this.doingDraggedCart) {
      this.doing.splice(this.doingDraggedCartId, 1);
      localStorage.removeItem('doing');
      localStorage.setItem('doing', JSON.stringify(this.doing));

      this.doingDraggedCart.id = this.duties.length ? this.duties[this.duties.length - 1].id + 1 : 1;
      this.duties.push(this.doingDraggedCart);

      localStorage.removeItem('duties');
      localStorage.setItem('duties', JSON.stringify(this.duties));

      this.doingDraggedCart = null;
    } else if (this.dutyDraggedCart) {
      this.dutyDraggedCart = null;
    } else {
      this.messageService.add({
        summary: 'خطا'
      })
    }
  }


  doingDragStart(id: number) {
    this.doing.find((x: any) => {
      if (x.id === id) {
        this.doingDraggedCart = x;
      }
    });
    this.doingDraggedCartId = this.doing.findIndex(x => x.id === id);
  }

  doingDragEnd() {
    this.doingDraggedCart = null;
  }

  dropDoing() {
    if (this.dutyDraggedCart) {
      this.duties.splice(this.dutyDraggedCartId, 1);

      localStorage.removeItem('duties');
      localStorage.setItem('duties', JSON.stringify(this.duties));

      this.dutyDraggedCart.id = this.doing.length ? this.doing[this.doing.length - 1].id + 1 : 1;
      this.doing.push(this.dutyDraggedCart);

      localStorage.removeItem('doing');
      localStorage.setItem('doing', JSON.stringify(this.doing));

      this.dutyDraggedCart = null;

    } else if (this.doneDraggedCart) {
      this.done.splice(this.doneDraggedCartId, 1);

      localStorage.removeItem('done');
      localStorage.setItem('done', JSON.stringify(this.done));

      this.doneDraggedCart.id = this.doing.length ? this.doing[this.doing.length - 1].id + 1 : 1;
      this.doing.push(this.doneDraggedCart);

      localStorage.removeItem('doing');
      localStorage.setItem('doing', JSON.stringify(this.doing));

      this.doneDraggedCart = null;
    } else if (this.doingDraggedCart) {
      this.doingDraggedCart = null;
    } else {
      this.messageService.add({
        summary: 'خطا'
      })
    }
  }


  doneDragStart(id: number) {
    this.done.find((x: any) => {
      if (x.id === id) {
        this.doneDraggedCart = x;
      }
    });
    this.doneDraggedCartId = this.done.findIndex(x => x.id === id);

  }

  doneDragEnd() {
    this.doneDraggedCart = null;
  }

  dropDone() {
    if (this.doingDraggedCart) {
      this.doing.splice(this.doingDraggedCartId, 1);

      localStorage.removeItem('doing');
      localStorage.setItem('doing', JSON.stringify(this.doing));

      this.doingDraggedCart.id = this.done.length ? this.done[this.done.length - 1].id + 1 : 1;
      this.done.push(this.doingDraggedCart);

      localStorage.removeItem('done');
      localStorage.setItem('done', JSON.stringify(this.done));

      this.doingDraggedCart = null;


      let end = Date.now() + (5 * 100);
      let colors = ['#f9c067', '#f0a242', '#f3ddd1', '#db6816', '#671e14', '#a79f0f', '#d39470'];


      (function frame() {
        confetti.create()({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: {x: 0, y: 1},
          colors: colors
        });
        confetti.create()({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: {x: 1, y: 1},
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (this.dutyDraggedCart) {
      this.duties.splice(this.dutyDraggedCartId, 1);

      localStorage.removeItem('duties');
      localStorage.setItem('duties', JSON.stringify(this.duties));

      this.dutyDraggedCart.id = this.done.length ? this.done[this.done.length - 1].id + 1 : 1;
      this.done.push(this.dutyDraggedCart);

      localStorage.removeItem('done');
      localStorage.setItem('done', JSON.stringify(this.done));

      this.dutyDraggedCart = null;


      let end = Date.now() + (5 * 100);
      let colors = ['#f9c067', '#f0a242', '#f3ddd1', '#db6816', '#671e14', '#a79f0f', '#d39470'];


      (function frame() {
        confetti.create()({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: {x: 0, y: 1},
          colors: colors
        });
        confetti.create()({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: {x: 1, y: 1},
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (this.doneDraggedCart) {
      this.doneDraggedCart = null;
    } else {
      this.messageService.add({
        summary: 'خطا'
      })
    }
  }

}
