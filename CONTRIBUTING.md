# Contributing

* Introduction
* Reporting and requesting
  * [Request Support](#request-support)
  * [Report an Error or Bug](#report-an-error-or-bug)
  * [Request a Feature](#request-a-feature)
* Contributing
  * [Project Setup](#project-setup)
  * [Contribute Documentation](#contribute-documentation)
  * [Contribute Code](#contribute-code)
* [Join the Project Team](#join-the-project-team)

## Introduction

Thank you so much for your interest in contributing! All types of contributions are encouraged and valued.

Please make sure to read the relevant section before making your contribution! It will make it a lot easier for us to make the most of it and smooth out the experience for all involved.

## Request Support

If you have a question about this project, how to use it, or just need clarification about something:

* Open an Issue at https://github.com/okonek/tidal-cli-client/issues
* Provide as much context as you can about what you're running into.
* Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant. If not, please be ready to provide that information if maintainers ask for it.

Once it's filed:

* The project team will label the issue.
* Someone will try to have a response soon.
* If you or the maintainers don't respond to an issue for 30 days, the issue will be closed. If you want to come back to it, reply (once, please), and we'll reopen the existing issue. Please avoid filing new issues as extensions of one you already made.
## Report an Error or Bug

If you run into an error or bug with the project:

* Open an Issue at https://github.com/okonek/tidal-cli-client/issues
* Include *reproduction steps* that someone else can follow to recreate the bug or error on their own.
* Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant. If not, please be ready to provide that information if maintainers ask for it.

Once it's filed:

* The project team will label the issue.
* A team member will try to reproduce the issue with your provided steps. If there are no repro steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
* If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#contribute-code).
* If you or the maintainers don't respond to an issue for 30 days, the issue will be closed. If you want to come back to it, reply (once, please), and we'll reopen the existing issue. Please avoid filing new issues as extensions of one you already made.
* `critical` issues may be left open, depending on perceived immediacy and severity, even past the 30 day deadline.
## Request a Feature

If the project doesn't do something you need or want it to do:

* Open an Issue at https://github.com/okonek/tidal-cli-client/issues
* Provide as much context as you can about what you're running into.
* Please try and be clear about why existing features and alternatives would not work for you.

Once it's filed:

* The project team will label the issue.
* The project team will evaluate the feature request, possibly asking you more questions to understand its purpose and any relevant requirements. If the issue is closed, the team will convey their reasoning and suggest an alternative path forward.
* If the feature request is accepted, it will be marked for implementation with `feature-accepted`, which can then be done by either by a core team member or by anyone in the community who wants to [contribute code](#contribute-code).

## Project Setup

So you wanna contribute some code! That's great! This project uses GitHub Pull Requests to manage contributions, so [read up on how to fork a GitHub project and file a PR](https://guides.github.com/activities/forking) if you've never done it before.

If this seems like a lot or you aren't able to do all this setup, you might also be able to [edit the files directly](https://help.github.com/articles/editing-files-in-another-user-s-repository/) without having to do any of this setup. Yes, even code.

If you want to go the usual route and run the project locally, though:

* [Install Node.js](https://nodejs.org/en/download/)
* [Install w3m and w3m-img](http://w3m.sourceforge.net/)
* [Install mpv](https://mpv.io/)
* [Fork the project](https://guides.github.com/activities/forking/#fork)

Then in your terminal:
* `cd path/to/your/clone`
* `npm install`

And when you are done, run:
* `npm run lint`
* `npm run test` (for tests to run, two environment variables are needed: USERNAME and PASSWORD, which are yours TIDAL account credentials. You can set them for your current terminal session with `export USERNAME=your_username` and `export PASSWORD=your_password`)

And you should be ready to go!

## Contribute Documentation

Documentation is a super important, critical part of this project. Docs are how we keep track of what we're doing, how, and why. It's how we stay on the same page about our policies. And it's how we tell others everything they need in order to be able to use this project -- or contribute to it. So thank you in advance.

Documentation contributions of any size are welcome! Feel free to file a PR even if you're just rewording a sentence to be more clear, or fixing a spelling mistake!

To contribute documentation:

* Edit or add any relevant documentation.
* Make sure your changes are formatted correctly and consistently with the rest of the documentation.
* Re-read what you wrote, and run a spellchecker on it to make sure you didn't miss anything.
* Make a commit.
* Go to https://github.com/okonek/tidal-cli-client/pulls and open a new pull request with your changes.
* If your PR is connected to an open issue, add a line in your PR's description that says `Fixes: #123`, where `#123` is the number of the issue you're fixing.

Once you've filed the PR:

* One or more maintainers will use GitHub's review feature to review your PR.
* If the maintainer asks for any changes, edit your changes, push, and ask for another review.
* If the maintainer decides to pass on your PR, they will thank you for the contribution and explain why they won't be accepting the changes. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly.
* If your PR gets accepted, it will be marked as such, and merged into the `latest` branch soon after. Your contribution will be distributed to the masses next time the maintainers tag a release.

## Contribute Code

We like code commits a lot! They're super handy, and they keep the project going and doing the work it needs to do to be useful to others.

Code contributions of just about any size are acceptable!

The main difference between code contributions and documentation contributions is that contributing code requires inclusion of relevant tests for the code being added or changed. Contributions without accompanying tests will be held off until a test is added, unless the maintainers consider the specific tests to be either impossible, or way too much of a burden for such a contribution.

To contribute code:

* [Set up the project](#project-setup).
* Make any necessary changes to the source code.
* Include any [additional documentation](#contribute-documentation) the changes might need.
* Write tests that verify that your contribution works as expected.
* Make a commit.
* Go to https://github.com/okonek/tidal-cli-client/pulls and open a new pull request with your changes.
* If your PR is connected to an open issue, add a line in your PR's description that says `Fixes: #123`, where `#123` is the number of the issue you're fixing.

Once you've filed the PR:

* Barring special circumstances, maintainers will not review PRs until all checks pass Travis.
* One or more maintainers will use GitHub's review feature to review your PR.
* If the maintainer asks for any changes, edit your changes, push, and ask for another review. Additional tags (such as `needs-tests`) will be added depending on the review.
* If the maintainer decides to pass on your PR, they will thank you for the contribution and explain why they won't be accepting the changes. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly.
* If your PR gets accepted, it will be marked as such, and merged into the `latest` branch soon after. Your contribution will be distributed to the masses next time the maintainers tag a release

### Adding new app features: code guideline

The app actions are handled by [redux](https://redux.js.org/).

#### UI
App UI consists of two `ActivityRunners`, `Panels`, that run in them and `uiComponents`, from which `Panels` are made of.

##### uiComponents
They are the most *low level* components in the app. Every `uiComponent` should extend the `BaseElement` class and be located in `app/UI/uiComponents/basicUI` if it's a more abstract and independent from apps state element or in `app/UI/uiComponents/specializedUI` if it's state-dependent.
The good example `uiComponent` can be `app/UI/uiComponents/basicUI/Button`.

First two arguments always passed to an `uiComponent` are: 
* `parent` is element's parent such as `Panel` or another `uiComponents`.
* `options` is element's style and options. You can read about them in [blessedjs documentation](https://github.com/chjj/blessed#element-from-node).
When styling your `uiComponent` with `options` you should use `AppConfiguration` to get user-defined colors.

The other arguments are custom. You can add them if you need to. The argument `store` should not be passed to `basicUI` components, only to `specializedUI`.

In the constructor you should pass the `parent` and a [blessedjs](https://github.com/chjj/blessed) element with `options` to **super**.
If you want to learn more about `components` events and attributes, you can read it in [blessedjs docs](https://github.com/chjj/blessed).

When your `uiComponent` is first rendered, the **async** `run()` function is called. You can implement it is preferred to do as much actions as possible in there rather than in the constructor.

To add any `children` to your `uiComponent`, you have to first create a `children` array with all of your `uiComponent's` children. And then you should call **async** `showElements` function. Don't do it in the **contructor**.

##### Panels
Panels are on higher-level than `uiComponents` and should always extend `Activity` class. They can dispatch actions in state and read it.
The good example `Panel` can be `app/UI/panels/PlayerPanel`.

Arguments passed to `Panel` are:
* `parent` is and `ActivityRunner` in which the `Panel` should run.
* `store` is app's **redux** store. You can dispatch actions to it and listen to it's state change.
* `options` *(optional)* is an object with any other arguments you want to pass the `Panel`.

In the constructor you should pass the `parent` and a [blessedjs](https://github.com/chjj/blessed) `box` with only **width** and **height** specified to **super**.

When your `Panel` is first rendered, the **async** `run()` function is called. You can implement it is preferred to do as much actions as possible in there rather than in the constructor.

To add any `children` to your `Panel`, you have to first create a `children` array with all of your `Panel's` children. And then you should call **async** `showElements` function. Don't do it in the **contructor**.

To run your `Panel`, you another elements has to **dispatch** `setCurrentActivity` action with your `Panel` class as a parameter.

##### ActionsInputPanel
It's an example of a *special* `Panel`. It consists of a **input bar**, where user inputs **actions** he wants to perform.

To add an **action** to the `UserActionsBar`, first add it to the `app/backend/Configuration/defaultAppConfig.json` `"INPUT_BAR_ACTIONS"` object. Then add the link to it in `app/UI/panels/userInputActions/actions` either in the `loginRequired` section if it shouldn't be available when not logged in or `loginNotRequired` if it should be always available.
The key should be taken from `AppConfiguration` and the value is a function, which takes the `store` argument first and then **action** argument which is *optional*.

If after reading this, you still have some doubts on how to add an **action**, you can take other action as an example.

## Provide Support on Issues

[Needs Collaborator](#join-the-project-team)

Helping out other users with their questions is a really awesome way of contributing to any community. It's not uncommon for most of the issues on an open source projects being support-related questions by users trying to understand something they ran into, or find their way around a known bug.

Sometimes, the `support` label will be added to things that turn out to actually be other things, like bugs or feature requests. In that case, suss out the details with the person who filed the original issue, add a comment explaining what the bug is, and change the label from `support` to `bug` or `feature`. If you can't do this yourself, @mention a maintainer so they can do it.

In order to help other folks out with their questions:

* Go to the issue tracker and [filter open issues by the `support` label](https://github.com/okonek/tidal-cli-client/issues?q=is%3Aopen+is%3Aissue+label%3Asupport).
* Read through the list until you find something that you're familiar enough with to give an answer to.
* Respond to the issue with whatever details are needed to clarify the question, or get more details about what's going on.
* Once the discussion wraps up and things are clarified, either close the issue, or ask the original issue filer (or a maintainer) to close it for you.

Some notes on picking up support issues:

* Avoid responding to issues you don't know you can answer accurately.
* As much as possible, try to refer to past issues with accepted answers. Link to them from your replies with the `#123` format.
* Be kind and patient with users -- often, folks who have run into confusing things might be upset or impatient. This is ok. Try to understand where they're coming from, and if you're too uncomfortable with the tone, feel free to stay away or withdraw from the issue. (note: if the user is outright hostile or is violating the CoC, [refer to the Code of Conduct](CODE_OF_CONDUCT.md) to resolve the conflict).

## Join the Project Team

### Ways to Join

There are many ways to contribute! Most of them don't require any official status unless otherwise noted. That said, there's a couple of positions that grant special repository abilities, and this section describes how they're granted and what they do.

All of the below positions are granted based on the project team's needs, as well as their consensus opinion about whether they would like to work with the person and think that they would fit well into that position. The process is relatively informal, and it's likely that people who express interest in participating can just be granted the permissions they'd like.

You can spot a collaborator on the repo by looking for the `[Collaborator]` or `[Owner]` tags next to their names.

Permission | Description
--- | ---
Issue Tracker | Granted to contributors who express a strong interest in spending time on the project's issue tracker. These tasks are mainly labeling issues, cleaning up old ones, and reviewing pull requests, as well as all the usual things non-team-member contributors can do. Issue handlers should not merge pull requests, tag releases, or directly commit code themselves: that should still be done through the usual pull request process. Becoming an Issue Handler means the project team trusts you to understand enough of the team's process and context to implement it on the issue tracker.
Committer | Granted to contributors who want to handle the actual pull request merges, tagging new versions, etc. Committers should have a good level of familiarity with the codebase, and enough context to understand the implications of various changes, as well as a good sense of the will and expectations of the project team.
Admin/Owner | Granted to people ultimately responsible for the project, its community, etc.

## Attribution

This guide was generated using the WeAllJS `CONTRIBUTING.md` generator. [Make your own](https://npm.im/weallcontribute)!

