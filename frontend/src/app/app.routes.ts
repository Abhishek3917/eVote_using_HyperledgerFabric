import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MidRegComponent } from './mid-reg/mid-reg.component';
import { DetailsComponent } from './signup/details/details.component';
import { NameComponent } from './signup/name/name.component';
import { AccDetailsComponent } from './signup/acc-details/acc-details.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { EditAccDetailsComponent } from './user-dash/edit-acc-details/edit-acc-details.component';
import { ProfileComponent } from './user-dash/profile/profile.component';
import { ViewElectionsComponent } from './view-elections/view-elections.component';
import { CollegeSelectComponent } from './college-select/college-select.component';
import { PhotoSelectComponent } from './photo-select/photo-select.component';
import { ElectionsComponent } from './user-dash/elections/elections.component';
import { ViewStatusComponent } from './college-dash/landing/view-status/view-status.component';
import { ViewResultsComponent } from './college-dash/view-results/view-results.component';
import { PastElectionsComponent } from './user-dash/past-elections/past-elections.component';

import { CollegeHomeComponent } from './college-home/college-home.component';
import { CollegeSignupComponent } from './college-signup/college-signup.component';
import { CollegeLoginComponent } from './college-login/college-login.component';
import { AdminDetailsComponent } from './college-signup/admin-details/admin-details.component';
import { CollegeDetailsComponent } from './college-signup/college-details/college-details.component';
import { CoursesComponent } from './courses/courses.component';
import { CollegeDashComponent } from './college-dash/college-dash.component';
import { NewElectionComponent } from './college-dash/new-election/new-election.component';
import { LandingComponent } from './college-dash/landing/landing.component';
import { CandidatesComponent } from './college-dash/candidates/candidates.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'mid-reg', component: MidRegComponent},
    {path: 'signup', component: SignupComponent, children: [
        { path: 'name', component: NameComponent },
        { path: 'details', component: DetailsComponent },
        { path: 'acc-details', component: AccDetailsComponent },
    ]},
    {path: 'user-dash', component: UserDashComponent, children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'editAcc', component: EditAccDetailsComponent},
        { path: 'elections', component: ElectionsComponent },
        { path: 'past-elections', component: PastElectionsComponent },
    ]},
    {path: 'viewElection', component: ViewElectionsComponent},
    {path: 'college-home', component: CollegeHomeComponent},
    {path: 'college-signup', component: CollegeSignupComponent, children: [
        { path: 'admin-details', component: AdminDetailsComponent },
        { path: 'college-details', component: CollegeDetailsComponent },
    ]},
    {path: 'college-login', component: CollegeLoginComponent},
    {path: 'college-dash', component: CollegeDashComponent, children: [
        { path: 'new-election', component: NewElectionComponent },
        { path: 'landing', component: LandingComponent},
        { path: 'candidates', component: CandidatesComponent },
        { path: 'view-status', component: ViewStatusComponent },
        { path: 'view-results', component: ViewResultsComponent }
    ]},
    {path: 'college-select', component: CollegeSelectComponent},
    {path: 'photo-select', component: PhotoSelectComponent},
    {path: 'courses', component: CoursesComponent},
];