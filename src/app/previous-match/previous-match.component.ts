import { Component } from '@angular/core';

export interface MatchData {
  id: string;
  player: string;
  date: string;
  setScore: string;
  matchScore: string;
  won: string;
}

const data: MatchData[] = [
  { id: 'kjahsdkjashdk', player: 'Harshvardhan Baldwa', date: '12th November', setScore: '3-2', matchScore: '11-0; 11-4; 11-6', won: 'Undecided' },
  { id: 'kjahsdkjashdk', player: 'Harshvardhan Baldwa', date: '12th November', setScore: '4-1', matchScore: '11-0; 11-4; 11-6', won: 'Won' },
  { id: 'kjahsdkjashdk', player: 'Harshvardhan Baldwa', date: '12th November', setScore: '1-4', matchScore: '11-0; 11-4; 11-6', won: 'Won' },
  { id: 'kjahsdkjashdk', player: 'Harshvardhan Baldwa', date: '12th November', setScore: '5-0', matchScore: '11-0; 11-4; 11-6', won: 'Lost' },
];

@Component({
  templateUrl: './previous-match.component.html',
  styleUrls: ['./previous-match.component.css']
})

export class PreviousMatchComponent {
  displayedColumns: string[] = ['date', 'player', 'result'];
  dataSource = data;
}
