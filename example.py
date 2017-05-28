import threading
import time
import datetime
import math


class TestThread(threading.Thread):

    """docstring for TestThread"""

    def __init__(self):
        super(TestThread, self).__init__()
        self.val = []

    def getData(self):
        v = self.val[:]
        self.val = []
        return v

    def run(self):
        count = 0
        while True:
            count += 1
            time.sleep(0.05)
            t = time.time()
            s = math.sin(count / 180.0 * 3.14) * 10 + 10
            c = math.cos((count + 30) / 180.0 * 3.14) * 10 + 10
            self.val.append({"time": t, "data1": s, "data2": c});
