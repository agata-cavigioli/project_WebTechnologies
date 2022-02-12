import csv
import json

places = {}

subs = {
        'York': 11,
        'Italy': 27,
        'Bologna': 2,
        'Connecticut': 5,
        'Massachusetts': 7,
        'Indiana': 1,
        'Illinois': 6,
        'Clazomenae': 1,
        'Lampsacus': 1,
        'Sicilies': 1,
        'Maryland': 1,
        'Marrakech': 1,
        'Uzbekistan': 1,
        'Wales': 3,
        'Scotland': 9,
        'Jersey': 2,
        'Pennsylvania': 3,
        'Republic': 2,
        'Switzerland': 10,
        'Lisbon': 1,
        'Bohemia': 1,
        'Union': 1,
        'Speyer': 1,
        'Württemberg': 1,
        'Denmark': 4,
        'Canada': 2,
        'Ohio': 2,
        'Ireland': 2,
        'California': 7,
        'Japan': 14,
        'Prussia': 3,
        'Algeria': 2,
        'Ithaca': 1,
        'Carolina': 1,
        'Alsace': 1,
        'Vermont': 1,
        'Mexico': 2,
        'Belgium': 2,
        'Wisconsin': 1,
        'Virginia': 1,
        'Split': 2,
        'Azerbaijan': 1,
        'Egypt': 1,
        'Iraq': 1,
        'States': 1,
        'Russia': 5,
        'Georgia': 1,
        'Iowa': 1,
        'Udine': 1,
        'Padua': 1,
        'Mantua': 1,
        'Missouri': 1,
        'Sweden': 1,
        'Australia': 1,
        'Naples': 1,
        'Portugal': 2,
        'Michigan': 1,
        'Hampshire': 1,
        'Turkistan': 1,
        'Syria': 1}


with open('./new.csv', 'w', encoding='utf-8') as f2:
    names = [
        'name',
        'birth',
        'birth_p',
        'death',
        'death_p',
        'subjects',
    ]
    old_names = [
        'Philosophers',
        'Born',
        'Birth place',
        'Died',
        'Place of Death',
        'Subjects Of Study',
    ]
    writer = csv.DictWriter(f2, fieldnames=names)
    writer.writeheader()
    for row in csv.DictReader(open('./data4.csv', 'r', encoding='utf-8')):
        del row['']
        del row['Notable Works']

        for name, oldname in zip(names, old_names):
            row[name] = row[oldname]
            del row[oldname]


        if row['birth_p'] in places:
            places[row['birth_p']] += 1
        else:
            places[row['birth_p']] = 1

        if row['death_p'] in places:
            places[row['death_p']] += 1
        else:
            places[row['death_p']] = 1


        writer.writerow(row)

print(places)

with open('./new.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    data = [x for x in reader]
    x = json.dumps(data, indent=4)
    with open('./new.json', 'w', encoding='utf-8') as f2:
        f2.write(x)

