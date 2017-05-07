
var _amberbit$elm_web_storage$Native_LocalStorage = function() {

  function quotaWasExceeded(e)
  {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
  function storageAvailable(type)
  {
    try
    {
      var storage = window[type],
      x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e)
    {
      return quotaWasExceeded(e) &&
      // acknowledge QuotaExceededError only if there's something already
      // stored
      storage.length !== 0;
    }
  }

  function localStorageAvailable()
  {
    return storageAvailable('localStorage');
  }

  function toMaybe(value)
  {
    return value === null
    ? _elm_lang$core$Maybe$Nothing
    : _elm_lang$core$Maybe$Just(value);
  }

  function nativeBinding(fn)
  {
    return _elm_lang$core$Native_Scheduler.nativeBinding(fn);
  }

  function succeed(v)
  {
    return _elm_lang$core$Native_Scheduler.succeed(v);
  }

  function unit()
  {
    return _elm_lang$core$Native_Utils.Tuple0;
  }

  function getItem(key)
  {
    return nativeBinding(function(callback)
    {
      var value = localStorage.getItem(key);
      callback(succeed(toMaybe(value)));
    });
  }

  function setItem(key, value)
  {
    return nativeBinding(function(callback)
    {
      try
      {
        localStorage.setItem(key, value);
        callback(succeed(unit()));
      }
      catch (e)
      {
        if (quotaWasExceeded(e))
        {
          callback(_elm_lang$core$Native_Scheduler.fail({ctor: 'QuotaExceeded'}));
        }
        else
        {
          _elm_lang$core$Native_Debug.crash('This is an unexpected error from elm-web-storage package. Please report an issue. Details: ' + e);
        }
      }
    });
  }

  function removeItem(key)
  {
    return nativeBinding(function(callback)
    {
      localStorage.removeItem(key);
      callback(succeed(unit()));
    });
  }

  function clear()
  {
    return nativeBinding(function(callback)
    {
      localStorage.clear();
      callback(succeed(unit()));
    });
  }

  function length()
  {
    return nativeBinding(function(callback)
    {
      var length = localStorage.length;
      callback(succeed(length));
    });
  }

  function key(index)
  {
    return nativeBinding(function(callback)
    {
      var keyName = localStorage.key(index);
      callback(succeed(toMaybe(keyName)));
    });
  }

  return {
    available: localStorageAvailable,
    getItem: getItem,
    setItem: F2(setItem),
    removeItem: removeItem,
    clear: clear,
    key: key,
    length: length
  };

}();
