# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx tiged reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- To create an app which calculates moving costs
- Using best-practice methods for code and test
- Using TypeScript, React.js, Redux for state management, Vitest for testing and SASS for styling


## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)

## Considerations

- Design document has been used. As the instructions did not specify mobile-first or other adjustments I created a desktop version which should be somewhat mobile-briendly but no effort has been put towards that end.
- The font-family was unclear to me from the figma design so I chose the closest I could get to it. This is not a problem in practice.
- There are some styling issues which could be improved (e.g. spacing between the action buttons on the confirmation page) but I ran out of the allotted time and it is not a high-priority issue.
- The application has working tests, which are very helpful when refactoring.

## Saving price proposals
Some consideration has been given to the saving of price proposals. 

-  To do this the back-end would have to support unique users and/or addresses. 
- Since we want to follow up potential customers then it is the e-mail which is most of value since it is the one most likely to be unique and there is a likelihood that the same user can come to the application with it in the future, which would offer better user tracking since we would be in the position to offer a discount to a repeat user. 
- We would at the very least need to send in the e-mail upon "Confirm and submit offer" to an end-point which would create a user by that name or update the data that we have on the user if this user has previously used our application.
- We would ideally like to store the from and to addresses as well as the names and contact info of the user. 
- We would also like to be able to store the price that was offered to the user in case we wish to offer a special discount to entice the user.
- In short we would probably want to store all the user contact data as well as the price quote at the very least, but ideally also the supplementary data found in the "Moving details" since we can assume that the user will not have to go to the trouble of telling us that again.
- If we store this data using the e-mail as the primary key, then it should be easy enough to help sales representatives track how many times a particular user has used our services and/or used the pre-offer service to research prices.
