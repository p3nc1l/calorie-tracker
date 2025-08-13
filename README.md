# Calorie Tracker

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Website](https://img.shields.io/badge/demo-online-brightgreen)](https://calorie-tracker.p3nc1l.com)

This repository contains the **Calorie Tracker** app, made by [p3nc1l](https://www.p3nc1l.com).

Feel free to try the app on by visiting [calorie-tracker.p3nc1l.com](https://calorie-tracker.p3nc1l.com)

The application's backend is powered by an API specifically written for it: [p3nc1l/calorie-tracker-backend](https://github.com/p3nc1l/calorie-tracker-backend).

## Introduction

This is a simple calorie tracker app. It's abilities include looking up foods from [FatSecret](https://platform.fatsecret.com/platform-api)'s food API, logging multiple foods as a meal, browsing through the logged meals, setting a daily goal, etc.

Looking up foods from the FatSecret API is made possible by the app's backend [API](https://github.com/p3nc1l/calorie-tracker-backend).

![App home page](/public/README/home-page.png)

The app features a five page design (home, foods, add/meal editor, meals, profile), navigating between them is possible with the bottom navigation bar.

## Setup

When visiting the app for the first time, the setup page will be shown.

**The data you provide in this setup can be changed any time later!**

![Setup page](/public/README/setup-page.png)

Click on **GET STARTED**.

### 1st Step: Disclaimer

![Step 1](/public/README/setup-step1.png)

The first step contains some information about how the data you provide to this app is handled. If you do not want your data to be used in the mentioned way, please do **not** continue with the setup, and leave the app.

### 2nd Step: Nickname

![Step 2](/public/README/setup-step2.png)

Please enter the nickname you would like the app to remember you with. The nickname must have at least 3 characters, but not more than 20.

### 3rd Step: Daily Goal

![Step 3](/public/README/setup-step3.png)

In the last step of the setup, you need to provide your preferred daily calorie goal. This value can not be smaller than 0, nor bigger than 100 000. Clicking on **FINISH** lets you access the app.

## Overview

### Navigation Bar

![Navbar](/public/README/navbar.png)

The navbar allows the user to navigate between the app's pages.

### Home Page

![App home page](/public/README/home-page.png)

The home page contains important data from that day, such as:

- A hero section saying hi to the user, and informing them about the remaining calorie amount to reach the daily goal.

- A cards section, containing two cards:

  1. Calories card - shows how many calories has the user logged that day out of the daily goal
  2. Nutrients Today card - shows the total amount of Fat, Carbohydrates and Protein consumed that day

### Foods Page

![Foods page](/public/README/foods-page.png)

The Foods page allows the user to search for any food available in the database, and see an overview of their nutritional values.

For example, using the term "chicken breast":

![Foods page querying "chicken breast"](/public/README/foods-page-query.png)

The app displays a total of the 20 most exact results.

### Add/Meal Editor Page

![Add page](/public/README/add-page.png)

The add page allows the user to create a list of foods, that can be logged as a meal, containing the name and time of the meal as well.

As default, the name of the meal is "Meal #*meal number* on *date*". The default time is set as the current time.

![Searching on Add page](/public/README/add-page-search.png)

Searching for foods in the bottom text field lets you add foods from the database to the **Foods Added** list on this page.

!["Egg" added to Add page](/public/README/add-page-added.png)

Adding a food on the Add page lets you track it's nutritional values as you increase or decrease the quantity, or remove the food from the list.

Clicking on **ADD CUSTOM FOOD** lets you add a blank entry to the list, allowing you to manually enter data, such as it's name, quantity, unit, calories, fat, etc.

![Add page with custom food added](/public/README/add-page-egg-cereal.png)

After naming, setting the time and adding the desired foods to the meal, you are able to save it on your device using the **SAVE** button on the bottom.

### Meals Page

The Meals page lets you browse between the meals you have previously saved.

![Meals page](/public/README/meals-page.png)

The meals listed are grouped into certain chronological groups.

Clicking on the little down pointing arrow on the left side of a meal, reveals the given meals details.

![Meals page with meal details](/public/README/meals-page-details.png)

The details show each individual food from the meal, and gives the option to edit or delete it.

Clicking on the **DELETE** button simply lets the user delete the desired meal.

Clicking on the **EDIT** button opens the **Meal Editor** page, a version of the Add page, which preloads the meals' data.

![Meal Editor page](/public/README/meal-editor.png)

### Profile Page

The profile page lets you change your nickname, your daily goal, see the credits of this app, and reset the data saved on your device.

![Profile page](/public/README/profile-page.png)

The nickname can be changed by clicking on it, under the avatar.

The daily goal can be changed by clicking on the little *pencil* icon, next to it.

Resetting the data sends the user back to the **Setup** page.

## Running locally

If you decide, that you want to host the app locally, follow these steps:

### 1st Step: Install node

In order for the app to run correctly you need to have node and npm installed on your machine. Please follow the instructions from [nodejs' website](https://nodejs.org).

### 2nd Step: Install the dependencies

To install the dependencies run the following command in the root directory of the project:

    npm install

### 3rd Step: Run the app

To launch the development server please run the following command in the same directory:

    npm run dev

#### 1st Alternative

If you want the app to be reachable on your whole network run (if you want to access it from other devices):

    npx vite --host

#### 2nd Alternative

If you want to build the app to deploy it on a web server follow this [guide](https://vite.dev/guide/static-deploy.html).

## Credits

- Developer: [p3nc1l](https://www.p3nc1l.com)

- [Thunder icons created by Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/thunder) ![thunder icon](/public/thunder.png)

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)

- [Material UI](https://mui.com/material-ui/)

- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
