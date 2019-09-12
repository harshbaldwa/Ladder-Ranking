import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PushNotificationService } from 'ngx-push-notifications';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatButtonModule,
         MatTableModule,
         MatBottomSheetModule,
         MatSortModule,
         MatFormFieldModule,
         MatInputModule,
         MatBadgeModule,
         MatIconModule,
         MatSelectModule,
         MatCardModule,
         MatExpansionModule,
         MatMenuModule,
         MatNativeDateModule,
         MatProgressSpinnerModule,
         MatSnackBarModule
         } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LadderTableComponent } from './ladder-table/ladder-table.component';
import { HeaderComponent } from './header/header.component';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ProfileComponent } from './profile/edit/profile.component';
import { PreviousMatchComponent } from './previous-match/previous-match.component';
import { ConfirmationComponent } from './confirmation/confirm-result/confirmation.component';
import { UpdateResultComponent } from './confirmation/update-result/updateResult.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LadderTableComponent,
    HeaderComponent,
    ChallengeNewComponent,
    ChallengeListComponent,
    ProfileComponent,
    PreviousMatchComponent,
    ConfirmationComponent,
    UpdateResultComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatBottomSheetModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
