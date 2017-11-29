import * as functions from 'firebase-functions';
import { TriggerAnnotated, Event } from 'firebase-functions';
import { DeltaSnapshot } from 'firebase-functions/lib/providers/database';

import { setBetaPlan } from './user/add-plan';
import { MailChimp } from './mailchimp/mailchimp';

let mailchimpConfig = functions.config().mailchimp;

let mailchimp = new MailChimp(mailchimpConfig.api_key);

export const postUserCreate = functions.database.ref('/users/{id}/common')
  .onCreate(event => {
    let user = event.data.val();
    console.log(`Subscribing user to MailChimp and adding 'beta' plan`, user);
    return Promise.all([
      mailchimp.addUserToList(user, mailchimpConfig.all_users_list_id),
      setBetaPlan(user.id)
    ]);
  });
