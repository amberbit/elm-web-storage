
var _amberbit$elm_web_storage$Native_LocalStorage = function() {

if (!localStorage || !localStorage.getItem || !localStorage.setItem)
{
	function disabled()
	{
		return _elm_lang$core$Native_Scheduler.fail({ ctor: 'Disabled' });
	}

	return {
		getItem: disabled,
		setItem: F2(disabled),
		removeItem: disabled,
		clear: disabled,
		key: disabled,
		length: disabled
	};
}

function getItem(key)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var value = localStorage.getItem(key);
		callback(_elm_lang$core$Native_Scheduler.succeed(
			value === null
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(value)
		));
	});
}

function setItem(key, value)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			localStorage.setItem(key, value);
			return callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
		}
		catch (e)
		{
			// TODO check exception type
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'QuotaExceeded' }));
		}
	});
}

function removeItem(key)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		localStorage.removeItem(key);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function clear() {
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		localStorage.clear();
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function key(index) {
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var keyName = localStorage.key(index);
		callback(_elm_lang$core$Native_Scheduler.succeed(
			keyName === null
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(keyName)
		));
	});
}

function length() {
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var length = localStorage.length;
		callback(_elm_lang$core$Native_Scheduler.succeed(length));
	});
}

return {
	getItem: getItem,
	setItem: F2(setItem),
	removeItem: removeItem,
	clear: clear,
	key: key,
	length: length
};

}();
