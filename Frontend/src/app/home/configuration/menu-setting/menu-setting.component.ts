import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MenuData } from 'src/app/models/menu-data.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-setting',
  templateUrl: './menu-setting.component.html',
  styleUrl: './menu-setting.component.css'
})
export class MenuSettingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  menuList: MenuData[] = [];
  parentMenuList: { key: number, value: string }[] = [];
  roleList: { key: string, value: string }[] = [
    { key: 'b82bc367-40b8-46be-865e-dfe2da84a913', value: 'Admin' },
    { key: '6ec2bc70-2899-487c-a925-607839187ec2', value: 'User' }
  ];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  formFields = [
    { label: 'Name', type: 'text', placeholder: 'Enter Name', controlName: 'menuName' },
    { label: 'URL', type: 'text', placeholder: 'Enter URL', controlName: 'url' },
    { label: 'Icon', type: 'text', placeholder: 'Enter Icon', controlName: 'icon' },
    { label: 'Order No', type: 'number', placeholder: 'Enter Order No', controlName: 'orderNo' },
    { label: 'Parent Menu', type: 'select', placeholder: '--- Select Parent Menu ---', controlName: 'parentId' }
  ];

  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      menuName: ['', Validators.required],
      url: ['', Validators.required],
      icon: ['', Validators.required],
      orderNo: ['', Validators.required],
      parentId: [0],
      isParent: [false],
      roleId: [[], Validators.required]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.loadMenuList();
  }

  loadMenuList() {
    this.menuService.getMenuList().subscribe(
      (data: MenuData[]) => {
        this.menuList = data;
        this.parentMenuList = this.menuList
          .filter(menu => menu.isParent)
          .map(menu => ({
            key: menu.id,
            value: menu.menuName
          }));
        this.dtTrigger.next(this.menuList);
      },
      error => {
        this.toastrService.danger('Failed to load menu list', 'Error');
      }
    );
  }

  onSave() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastrService.danger('Please input required fields!', 'Error');
      return;
    }

    this.menuService.saveMenu(this.form.value).subscribe(
      () => {
        this.toastrService.success('Menu saved successfully', 'Success');
        this.reRender();
        this.refresh();
      },
      error => {
        this.toastrService.danger('Failed to save menu', 'Error');
      }
    );
  }

  editMenu(item: MenuData) {
    this.form.patchValue(item);
  }

  deleteMenu(menuId: number) {
    this.menuService.deleteMenu(menuId).subscribe(
      (response: boolean) => {
        if (response) {
          this.toastrService.success('Menu deleted successfully', 'Success');
          this.reRender();
        } else {
          this.toastrService.danger('Failed to delete menu', 'Error');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  refresh() {
    this.form.reset();
    this.submitted = false;
  }

  checkboxChangeParent(event: boolean) {
    if (event) {
      this.form.get('parentId').clearValidators();
    } else {
      this.form.get('parentId').setValidators(Validators.required);
    }
    this.form.get('parentId').updateValueAndValidity();
  }

  reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.loadMenuList();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
