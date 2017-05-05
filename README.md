# Elm Web Storage

Store values in a user's browser with Web Storage API: window.localStorage and
window.sessionStorage.

> **Note:** sessionStorage support is in progress.

## Example

Full example based on TODOMVC available in [/example](https://github.com/amberbit/elm-web-storage/tree/master/example)
```elm
import LocalStorage

type alias Msg =
    TokenAvailable (Result LocalStorage.Error (Maybe String))
    | TokenForgotten (Result LocalStorage.Error ())
    | TokenStored (Result LocalStorage.Error ())

getToken : Task LocalStorage.Error (Maybe String) -> Cmd Msg
getToken =
    LocalStorage.getItem "token"
        |> Task.attempt TokenAvailable

setToken : String -> Task LocalStorage.Error () -> Cmd Msg
setToken token =
    LocalStorage.setItem "token" token
        |> Task.attempt TokenStored

forgetToken : Task LocalStorage.Error () -> Cmd Msg
forgetToken =
    LocalStorage.removeItem "token"
        |> Task.attempt TokenForgotten
```

## Installation

In your `elm-package.json`:

```json
  "dependencies": {
    "amberbit/elm-web-storage": "0.1.0 <= v < 0.2.0"
  },
```

Install [elm-github-install](https://github.com/gdotdesign/elm-github-install)
with:

```sh
gem install elm_install
```

If you don't have Ruby installed, read about [other installation options](https://github.com/gdotdesign/elm-github-install/blob/master/Readme.md#installation).

Install this package:

```sh
cd elm-project
elm-install
```


## Documentation

> **Note:** This library is exposing JavaScript's `localStorage`
and `sessionStorage` APIs. As of this writing, that means you
get about 5MB of space. This space is the total for your whole top-level domain,
so you cannot store 5MB into localStorage and then 5MB into sessionStorage.
Users can also clear all this storage in their browser settings or disable it
completely, so it is not 100% reliable.


Package documentation: currently the best source of information are the example
and test app.

Web API documentation
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)


## Debugging/troubleshooting

Use an app in `/test` to run integration tests in your browser and open an issue
with output. Pull requests are welcome.

## Justification

As of Elm 0.18 the official way to access localStorage and sessionStorage is
with Elm `ports` feature. It requires every developer to come up with their own
implementation each time and do error handling on their own. That can lead to JS
runtime errors and loss of tribal experience with Web Storage APIs and Elm. This
repository aims to collect that knowledge and hopefully make it easier to add
direct support for this part of Web API in Elm.

## Note

Initial version of `LocalStorage` module was extracted from Evan Czaplicki's
[Cache package](https://github.com/elm-lang/persistent-cache).
