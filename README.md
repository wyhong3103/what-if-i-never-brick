# What If I never brick?


<div align="center">
	<img src="https://github.com/wyhong3103/what-if-i-never-brick/blob/main/src/assets/neverbrick.png" width="300">
</div>

[Click me to visit the site](https://what-if-i-never-brick.netlify.app/)

A web application that filters out all the unsuccessful contests you have participated in Codeforces contests and predicts your rating today based on only the optimal contests.

There are two calculation modes: fast and slow.

### Fast but less accurate

This mode follows a simple formula to calculate your rating, which may be less accurate.

```
Delta = (Performance - Current Rating) / 4
```

The fast mode is incredibly fast because it fetches only the necessary data, which includes your rating changes in every contest, in a single API call.

### Slow but more accurate

This mode follows a [blog post](https://codeforces.com/blog/entry/20762) that was written by [MikeMirzayanov](https://codeforces.com/profile/MikeMirzayanov), the founder of Codeforces. The slow mode takes more time as it needs to fetch all the contest data you have participated in, and each API call takes 2 seconds.

## Running it locally

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

## License & copyright

Licensed under [MIT License](https://github.com/wyhong3103/what-if-i-never-brick/blob/main/LICENSE)
