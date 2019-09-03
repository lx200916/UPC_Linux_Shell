from flask import Flask, request,render_template,g




app = Flask(__name__)
@app.before_request

@app.before_request
def before_request():
    file2 = open('num.txt', 'r')
    num=file2.read()
    if(num):
        g.num = int(num)
    else:
     g.num=1
    file2.close()
@app.route('/send/',methods=['post'])
def send():
    file1 = open('mess.txt', 'a+')
    g.num = g.num + 1
    file2 = open('num.txt', 'w+')
    print(g.num,file=file2)
    print(g.num)
    print(str(g.num)+"  "+request.form['name']+":"+request.form['msg']+'\n',file=file1)
    file1.close()
    file2.close()
    return 'Done.'
@app.route('/')
def index():
    return render_template('12.html',num=g.num)
if __name__ == '__main__':
    app.run(debug=True,port=9999,host="0.0.0.0")