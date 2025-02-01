import xlsxwriter
import requests
import sys

# get and organize data
url = 'https://iitindoor.pythonanywhere.com/api/game/'
res = requests.get(url);

if  res.status_code != 200 :
    print("Network error.")
    sys.exit(1);

game_data = res.json()
good_player_data = {}

for game in game_data:
    for team in game['teams']:
        for player in team.get('players'):
            info = {
                "name": player.get('name'),
                "batch": player.get('batch'),
                "team": team.get('name'),
                "game": game.get('name'),
                "number": team.get('number'),
                "type": 'Single' if game.get('player_count') == 1 else 'Team',
                "amount": game.get('entry_fee'),
                "payment": 'due' if team.get('status') == 'pending' else 'Okay',
            }
            # print( game.get('name'), team.get('name'), player.get('name') )
            mail = player.get('email');
            # print( mail );
            prev_info = good_player_data.get(mail, [])
            prev_info.append(info)
            good_player_data[mail] = prev_info
            # print(good_player_data[mail]);


# write on excel
workbook = xlsxwriter.Workbook('output.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write('A1', 'Name')
worksheet.write('B1', 'Batch')
worksheet.write('C1', 'Team')
worksheet.write('D1', 'Segments')
worksheet.write('E1', 'Contact')
worksheet.write('F1', 'Type')
worksheet.write('G1', 'Amount')
worksheet.write('H1', 'Payment')
worksheet.write('I1', 'Attendence')

col = 0
row = 1
for player_mail, info_list in good_player_data.items():
    print(player_mail, len(info_list))
    worksheet.write(row, col, info_list[0].get('name') )
    worksheet.write( row, col + 1, info.get('batch') )

    for info in info_list:
        # worksheet.write( row, col,     info_list[0].get('name') )
        # worksheet.write( row, col + 1, info.get('batch') )
        worksheet.write( row, col + 2, info.get('team') )
        worksheet.write( row, col + 3, info.get('game') )
        worksheet.write( row, col + 4, info.get('number') )
        worksheet.write( row, col + 5, info.get('type') )
        worksheet.write( row, col + 6, info.get('amount') )
        worksheet.write( row, col + 7, " " if info.get('payment') == 'due' else info.get('payment') )
        # worksheet.write( row, col + 1, info.get('batch') )
        row += 1
    # row += len(info_list)

workbook.close()