import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadderTableComponent } from './ladder-table/ladder-table.component';
import { ChallengeNewComponent } from './challenge-new/challenge-new.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ProfileComponent } from './profile/edit/profile.component';
import { PreviousMatchComponent } from './previous-match/previous-match.component';
import { ConfirmationComponent } from './confirmation/confirm-result/confirmation.component';
import { ProfileMatchComponent } from './profile/matches/match.component';
import { UpdateResultComponent } from './confirmation/update-result/updateResult.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: LadderTableComponent },
  { path: 'challenge/:id/:name', component: ChallengeNewComponent },
  { path: 'challenges', component: ChallengeListComponent },
  { path: 'profile/match', component: ProfileMatchComponent },
  { path: 'profile/edit', component: ProfileComponent },
  { path: 'previous', component: PreviousMatchComponent },
  { path: 'confirmation/confirm', component: ConfirmationComponent },
  { path: 'confirmation/update/:id', component: UpdateResultComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
