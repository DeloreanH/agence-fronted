import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LoaderService } from '../../../../common/components/loader/loader.service';
import { IUser } from '../../../../common/interfaces';
import { IDataForm } from '../../../../common/interfaces/peformance.interface';
import { ToastService } from '../../../../core/services/toast.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  users: IUser[] = [];
  form: FormGroup;
  minRangeDate = moment('2000-01-01');
  maxRangeDate = moment('2007-12-31');
  defaultStartDate = moment('2007-01-01');
  defaultEndDate = moment('2007-12-31');

  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<IUser>([]);
  selection = new SelectionModel<IUser>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() dataForm = new EventEmitter<IDataForm>();

  @Output() relatorio = new EventEmitter();
  @Output() pizza = new EventEmitter();
  @Output() graph = new EventEmitter();

  @Input() relatorioDisabled = false;
  @Input() pizzaDisabled = false;
  @Input() graphDisabled = false;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
    this.createForm();
  }

  async ngOnInit(): Promise<void> {
    this.initializeTable();
    this.changeFormEvents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  initializeTable(): void {
    try {
      this.showLoading();
      this.userService.getConsultans().subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
    } finally {
      this.hiddenLoading();
    }
  }

  showLoading(): void {
    this.loaderService.show();
  }

  hiddenLoading(time = 500): void {
    setTimeout(() => {
      this.loaderService.hide();
    }, time);
  }

  createForm(): void {
    this.form = new FormGroup({
      startDate: new FormControl(this.defaultStartDate, [Validators.required]),
      endDate: new FormControl(this.defaultEndDate, [Validators.required]),
      users: new FormControl(null, [Validators.required])
    });
  }

  changeFormEvents(): void {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.dataForm.emit(this.form.value);
      } else {
        this.dataForm.emit(null);
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    this.updateUsersFieldInForm();
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  datePickerHandler( date: Moment, datepicker: MatDatepicker<Moment>, name: string): void {
    const { startDate, endDate } = this.form.value;
    const isRangeValid =
      name === 'startDate'
        ? this.isRangeValid(date, endDate)
        : this.isRangeValid(startDate, date);

    if (isRangeValid) {
      this.form.patchValue({ [name]: date });
    } else {
      this.toastService.error('Rango de fecha invalidos');
    }
    datepicker.close();
  }

  updateUsersFieldInForm(): void {
    const usersIds = this.getUsersId();
    this.form.patchValue({ users: usersIds });
  }

  getUsersId(): string[] {
    return this.selection.selected.map(user => {
      return user.co_usuario;
    });
  }

  addRowToSelection(user: IUser): void {
    this.selection.toggle(user);
    this.updateUsersFieldInForm();
  }

  clickRelatorio(): void {
    this.relatorio.emit();
  }

  clickPizza(): void {
    this.pizza.emit();
  }

  clickGraph(): void {
    this.graph.emit();
  }

  isRangeValid(startDate: Moment, endDate: Moment): boolean {
    return startDate.isAfter(endDate) ? false : true;
  }
}
