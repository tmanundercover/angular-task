import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileActions } from '@store/actions';
import { AppState } from '@store/reducers';
import { getUserProfile } from '@store/selectors';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-profile-detail',
    styleUrls: ['./profile-detail.component.less'],
    templateUrl: './profile-detail.component.html'
})
export class ProfileDetailComponent implements OnInit {
    public get user() {
        return this.profileService.currentUser;
    }

    subscription: Subscription = null;

    user$ = this.store.select(getUserProfile);

    constructor(private store: Store<AppState>, private profileService: ProfileService) { }

    ngOnInit() {

        this.store.dispatch(profileActions.initProfile({ user: this.user$ }));
        this.subscription = this.user$.subscribe((response) => {
            if (!this.profileService.currentUser) {
                this.profileService.currentUser = response;
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
            }

        })

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
