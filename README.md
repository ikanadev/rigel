# Auleca
An helper app to manage student's grades and assistance.

## Testing

Before runing the test, we need to install the headless browsers to run playwright, we can install them with:

`pnpm exec playwright install`

And its dependences with (it will ask for sudo permissions): 

`pnpm exec playwright install-deps`

### Initial setup

To run the test, it requires:

A user with the following credentials:
```
email: test@test.test
password: testtest
```

A subject: "Matematica" for "1ro de Secundaria". 

A initialized period.

The backend and front-end should be runing.
