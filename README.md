## Members
1.  6030053921  Keerati Chuatanapinyo
2.  6030559121  Siwat Pongpanit
3.  6030631621  Anawat Trongwattananon
4.  6031022621  Thanapun Yan-amporn
5.  6031055321  Weerayut Thinchamlong
6.  6031059921  Setthanan Nakaphan

## Assignment #2: gRPC and REST API Benchmarking

### Graphs showing the benchmarking results with the explanation of your experimental settings.

**Scenario a.** Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items.<br />
In this scenario we just loop through the insert service using exec of child process.

<img src = '/ScenarioA.png' width='498' height='312'>

**Scenario b.** Multiple clients with different kind of calls.<br />
Both applying the child process to send request and have two clients.

<img src = '/ScenarioB.png' width='498' height='312'>

**Scenario c.** Vary the number of concurrent calls from 1 to 4096 calls.
Both using Class to generate multiple client objects to call concurrent calls.

<img src = '/ScenarioC.png' width='498' height='312'>

### Discussion of the results why one method is better the other in which scenarios.
In scenario a, a performance of gRPC inserting a book is quite close to a performance of REST API. We notice that ina scenario c gRPC performs far better than REST API. Of course, gRPC would be better than REST API since gRPC uses http/2 while REST API uses http/1. However, there is something weird about scenario b. I think it is because of the interface of gRPC client to access the server makes it performance quite terrible.

### Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance. 
**Language Neutral:** Since REST API has been renowed and dominated in software development industry, developer usually familiar with the syntax of REST API more than gRPC.<br />
**Ease of Use:** REST API's payload format is JSON which is more readable than proctobuf. Additionally, client need no setup to sent a request to a server just call a web server address.<br />
**Performance:** From the benchmarking experiment, overall, gRPC is faster than REST API.<br />

### Does your results comply with the results in [this Medium article](https://medium.com/@bimeshde/grpc-vs-rest-performance-simplified-fd35d01bbd4?)? How?
Not really since in scenario b result does not comply with a benchmark result in that article.
