module LocalStorage
    exposing
        ( length
        , key
        , getItem
        , setItem
        , removeItem
        , clear
        , Error(..)
        )

{-| Low-level bindings to the [localStorage] API.

[localStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage


# Storage

@docs getItem, setItem, removeItem, length, key, Error


# Curate your Storage

@docs clear

-}

import Native.LocalStorage
import Task exposing (Task)


{-| These low-level operations can fail in a few ways:

  - `QuotaExceeded` means you exceeded your 5MB and need to `clear` or
    `removeItem` some information to make more space.
  - `Disabled` means the user turned off local storage. It is rare, but it can
    happen.

-}
type Error
    = QuotaExceeded
    | Disabled


{-| Get an integer representing the number of data items stored.
-}
length : Task Error Int
length =
    Native.LocalStorage.length ()


{-| When passed a number n, this function will return the name of the nth key in
the storage.
-}
key : Int -> Task Error (Maybe String)
key =
    Native.LocalStorage.key


{-| Get the value at a particular key.

    getItem "age"

-}
getItem : String -> Task Error (Maybe String)
getItem =
    Native.LocalStorage.getItem


{-| Set a key to a particular value. If the key does not exist, it is added.
If the key already exists, we overwrite the old data.

    setItem "age" "42"

Most browsers cap you at 5MB of space, so this can trigger a `QuotaExceeded`
error if you are adding enough data to cross that threshold.

-}
setItem : String -> String -> Task Error ()
setItem =
    Native.LocalStorage.setItem


{-| Remove a particular key and its corresponding value.

    removeItem "age"

-}
removeItem : String -> Task Error ()
removeItem =
    Native.LocalStorage.removeItem


{-| Remove everything in local storage.
-}
clear : Task Error ()
clear =
    Native.LocalStorage.clear ()
