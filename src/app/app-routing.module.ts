import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadderTableComponent } from './ladder-table/ladder-table.component';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ProfileComponent } from './profile/edit/profile.component';
import { PreviousMatchComponent } from './previous-match/previous-match.component';
import { ConfirmationComponent } from './confirmation/confirm-result/confirmation.component';
import { UpdateResultComponent } from './confirmation/update-result/updateResult.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LadderTableComponent },
  { path: 'challenge/:id/:name', component: ChallengeNewComponent, canActivate: [AuthGuard] },
  { path: 'challenges', component: ChallengeListComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'previous', component: PreviousMatchComponent, canActivate: [AuthGuard] },
  { path: 'confirmation/confirm', component: ConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'confirmation/update/:id', component: UpdateResultComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
