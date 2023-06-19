# What If I never brick?

A web application that filters out all the bad contests you have done in codeforces contests and predict your rating today if you have only taken the optimal contests.

There are 2 calculation modes, fast and slow.

### Fast but less accurate

This mode follows a simple formula to calculate your rating which is less accurate.

```
Delta = (Performance - Current Rating) / 4
```

Fast mode is lightningly fast, because it only fetches all the contests data in one API call.


### Slow but more accurate

This mode follows a [blog](https://codeforces.com/blog/entry/20762) that was posted by [MikeMirzayanov](https://codeforces.com/profile/MikeMirzayanov) The Founder of Codeforces.

Slow mode is really slow, because it has to fetch all the contest data that you have participated, and each API call takes 2 seconds.

# Running it locally

To launch the web application, it is necessary to have <a href="http://nodejs.org/" target="_blank">Node.js</a> and <a href="https://npmjs.com/" target="_blank">npm</a> installed on your system.

Once you have installed them: 

1. Clone this repository to your local machine with:

	`$ git clone https://github.com/wyhong3103/what-if-i-never-brick.git`

2. Change directory to the cloned repository with:

	`$ cd what-if-i-never-brick`

3. Install the dependencies with:

	`$ npm i`

4. Start a development server with:

	`$ npm start`