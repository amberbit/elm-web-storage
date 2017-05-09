# TodoMVC in Elm with elm-web-storage

All of the Elm code lives in `Todo.elm` and relies on the [elm-lang/html][html] and [amberbit/elm-web-storage][elm-web-storage] libraries.

[html]: http://package.elm-lang.org/packages/elm-lang/html/latest
[elm-web-storage]: https://github.com/amberbit/elm-web-storage


## Build Instructions

Run the following commands from the root of this project:

```sh
gem install elm_install
elm-install
elm-make Todo.elm --output elm.js
python -m SimpleHTTPServer 4000
```

Then open [http://localhost:4000](http://localhost:4000) in your browser!


## Note

This app is based on Evan Czaplicki's [TodoMVC in
Elm](https://github.com/evancz/elm-todomvc).
