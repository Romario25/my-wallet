import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import {BillServices} from './shared/services/bill.services';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import {CategoryService} from './shared/services/category.service';
import {EventService} from './shared/services/event.service';

@NgModule({
    imports: [CommonModule, SharedModule, SystemRoutingModule],
    exports: [],
    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent,
        SidebarComponent,
        HeaderComponent,
        DropdownDirective,
        BillCardComponent,
        CurrencyCardComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        AddEventComponent,
        RecordsPageComponent
    ],
    providers: [BillServices, CategoryService, EventService]
})
export class SystemModule {

}
