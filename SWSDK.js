module.exports = {
	Authentication : require('./lib/SWServices/Authentication/AuthenticationService.js'),
	StampService : require('./lib/SWServices/Stamp/StampService.js'),
	IssueService : require('./lib/SWServices/Issue/IssueService.js'),
	IssueJsonService : require('./lib/SWServices/IssueJson/IssueJsonService.js'),
	CancelationService : require('./lib/SWServices/Cancelation/CancelationService.js'),
	AccountBalance : require('./lib/SWServices/AccountBalance/AccountBalanceService.js'),
	StampServiceV4 : require('./lib/SWServices/Stamp/StampServiceV4.js'),
	IssueServiceV4 : require('./lib/SWServices/Issue/IssueServiceV4.js'),
	IssueJsonServiceV4 : require('./lib/SWServices/IssueJson/IssueJsonServiceV4.js')
};