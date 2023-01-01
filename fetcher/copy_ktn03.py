# Description: Copy KTN02 to KTN03 (for backward compatibility)
# Related issue: https://github.com/mptwaktusolat/app_waktu_solat_malaysia/issues/160

import json

with open('../json/db.json','r+' ) as json_file:
    data = json.load(json_file)
    for p in data['solat']:
        # find where is ktn02
        if p['zone'] == 'KTN02':
            print('ktn02 found')

            ktn02_data = p.copy()

            ktn02_data['zone'] = 'KTN03'
            data['solat'].append(ktn02_data)

    # write the new content back to db.json
    json_file.seek(0)
    json.dump(data, json_file, indent=2)

print('Done appending')
