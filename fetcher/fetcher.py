import json
import time
from datetime import datetime
from zoneinfo import ZoneInfo

import requests
import urllib3

urllib3.disable_warnings()  # disable certificate error warning

reqUrl = "https://www.e-solat.gov.my/index.php"

jakim_code = [
    "JHR01", "JHR02", "JHR03", "JHR04", "KDH01", "KDH02", "KDH03", "KDH04",
    "KDH05", "KDH06", "KDH07", "KTN01", "KTN02", "MLK01", "NGS01", "NGS02",
    "NGS03", "PHG01", "PHG02", "PHG03", "PHG04", "PHG05", "PHG06", "PRK01",
    "PRK02", "PRK03", "PRK04", "PRK05", "PRK06", "PRK07", "PLS01", "PNG01",
    "SBH01", "SBH02", "SBH03", "SBH04", "SBH05", "SBH06", "SBH07", "SBH08",
    "SBH09", "SGR01", "SGR02", "SGR03", "SWK01", "SWK02", "SWK03", "SWK04",
    "SWK05", "SWK06", "SWK07", "SWK08", "SWK09", "TRG01", "TRG02", "TRG03",
    "TRG04", "WLY01", "WLY02"
]  # Total 59

data = {'solat': []}

print(f'Total of {len(jakim_code)}')
print('\nStarting\n')

attempt_count = 0

# Retry the failed request until all filled up
while len(jakim_code) != 0:
    if attempt_count > 0:
        failed = '", "'.join(x for x in jakim_code)
        print(f'\nFailed to fetch: "{failed}"')
        print(f'\nRetrying failed requests. Attempt #{attempt_count}\n')

    # Iterate each of the JAKIM code
    for zone in jakim_code:

        params = {
            'r': 'esolatApi/takwimsolat',
            'period': 'month',
            'zone': zone,
        }

        response = requests.get(reqUrl, params=params, verify=False)
        json_response = response.json()

        # Only put into json if everything's fine
        if (response.status_code == 200) and json_response['status'] == 'OK!':
            print(f"{zone} : {json_response['status']}")
            data['solat'].append(json_response)
            jakim_code.remove(zone)
        else:
            print(
                f'{zone} : Failed ({response.status_code}) - {json_response["status"]}'
            )

        # Pause 1.5 secs before the next api call
        # to prevent 'ddos' to their server
        time.sleep(1.5)

    attempt_count += 1

# Don't be scared, this block of code just for logging time
fetch_finish_myt = datetime.now(ZoneInfo('Asia/Kuala_Lumpur'))
current_month = fetch_finish_myt.strftime("%m")
current_year = fetch_finish_myt.strftime("%Y")
fetch_finish_myt = fetch_finish_myt.strftime(
    "%a, %d %b %Y %H:%M:%S MYT")  # format MYT time
fetch_finish_utc = time.strftime("%a, %d %b %Y %H:%M:%S %Z")  # format UTC Time
print(f'\nFetching finish at {fetch_finish_myt}')
print(f'Fetching finish at {fetch_finish_utc}')

# writing all location data to file
with open('../json/db.json', 'w') as outfile:
    json.dump(data, outfile, indent=2)
    print('\nFinish writing to db.json')

log = {'fetcher_last_run': fetch_finish_myt, 'valid_month': int(current_month), 'valid_year': int(current_year)}

# writing log
with open('../json/log.json', 'w') as outfile:
    json.dump(log, outfile, indent=2)
    print('Log is written to log.json')
