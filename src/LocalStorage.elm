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

  - `QuotaExceeded` means you exceeded your storage space limit and need to
    `clear` or `removeItem` some information.
  - `NotAvailable` means the user turned off localStorage or browser doesn't
    support it. It is rare, but it can happen.

-}
type Error
    = QuotaExceeded
    | NotAvailable


{-| Get an integer representing the number of data items stored.
-}
length : Task Error Int
length =
    if Native.LocalStorage.available () then
        Native.LocalStorage.length ()
    else
        Task.fail NotAvailable


{-| When passed a number n, this function will return the name of the nth key in
the storage.
-}
key : Int -> Task Error (Maybe String)
key index =
    if Native.LocalStorage.available () then
        Native.LocalStorage.key index
    else
        Task.fail NotAvailable


{-| Get the value at a particular key.

    getItem "age"

-}
getItem : String -> Task Error (Maybe String)
getItem key =
    if Native.LocalStorage.available () then
        Native.LocalStorage.getItem key
    else
        Task.fail NotAvailable


{-| Set a key to a particular value. If the key does not exist, it is added.
If the key already exists, we overwrite the old data.

    setItem "age" "42"

Most browsers cap you at 5MB of space, so this can trigger a `QuotaExceeded`
error if you are adding enough data to cross that threshold.

-}
setItem : String -> String -> Task Error ()
setItem key value =
    if Native.LocalStorage.available () then
        Native.LocalStorage.setItem key value
    else
        Task.fail NotAvailable


{-| Remove a particular key and its corresponding value.

    removeItem "age"

-}
removeItem : String -> Task Error ()
removeItem key =
    if Native.LocalStorage.available () then
        Native.LocalStorage.removeItem key
    else
        Task.fail NotAvailable


{-| Remove everything in local storage.
-}
clear : Task Error ()
clear =
    if Native.LocalStorage.available () then
        Native.LocalStorage.clear ()
    else
        Task.fail NotAvailable
