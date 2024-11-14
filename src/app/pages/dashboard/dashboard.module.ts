import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

import { MenubarModule } from 'primeng/menubar';

import { ButtonModule } from 'primeng/button';




@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        InputTextareaModule,
        CardModule,
        ButtonModule,
        SidebarModule,
        MenubarModule
        
    ],
    declarations: []
})
export class DashboardModule { }
