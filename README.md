# Tax Lookup

### An HTTP API to provide real estate tax balance data for a given account number.

This API scrapes the HTML of the City of Philadelphia's tax lookup application’s <a href="http://www.phila.gov/revenue/realestatetax/?txtBRTNo=883309050">results page</a> using the txtBRTNo query string parameter to lookup a specific account on the tax lookup application.

Build and run the image using the following instructions
```
docker build -t [NAME YOUR IMAGE] .
docker run -d --name [NAME YOUR CONTAINER] IMAGE_NAME
```
<p>Once done, you can view the app from the container's IP address.</p>
<p>Enter the Account number you would like and you should receive the tax balance info.</p>
Or you could run the following from the command line to view the json payload

```
curl http://[CONTAINER IP ADDRESS]/lookup?txtBRTNo=[ACCOUNT NUMBER]
```