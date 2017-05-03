# Elm Web Storage

Store values in a user's browser with Web Storage API: window.localStorage and
window.sessionStorage.

> **Note:** This library is exposing JavaScript's `localStorage`
and `sessionStorage` APIs. As of this writing, that means you
get about 5MB of space. This space is the total for your whole domain, so you
cannot store 5MB into localStorage and then 5MB into sessionStorage. Users can
also clear all this storage in their browser settings or disable it completely,
so it is not 100% reliable.


## Installation

In your `elm-package.json`:

```json
  "dependencies": {
    "amberbit/elm-web-storage": "0.0.1 <= v < 0.1.0"
  },
```

Install [elm-github-install](https://github.com/gdotdesign/elm-github-install) according to instructions or with:

```sh
gem install elm_install
```

Download packages:

```sh
cd elm-project
elm-install
```


## Example

```elm
import LocalStorage

getToken : Task x (Maybe String)
getToken =
  LocalStorage.get "token"

setToken : String -> Task x ()
setToken =
  LocalStorage.set "token"
```


## Documentation

Package documentation

Web API documentation
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)


## Justification

As of Elm 0.18 the official way to access localStorage and sessionStorage is
with Elm `ports` feature. It requires every developer to come up with their own
implementation each time and do error handling on their own. That can lead to JS
runtime errors and loss of tribal experience with Web Storage API and Elm. This
repository aims to collect that knowledge and use a more appropriate mechanism
to deal with side effects called Tasks.

## Note

`LocalStorage` module was extracted from [Evan Czaplicki's Cache
module](https://github.com/elm-lang/persistent-cache).
