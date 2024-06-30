class Points {

    static calcUserPoints(exitFunc) {
        FBDatabase.queryUserValue("",(data) => {
            let badges = data.values().toArray().filter(b => b !== undefined);
            let totalPoints = 0;
            let count = 0;

            console.log(data)

            for (let badge of badges) {
                database.ref("badges/" + badge.id + "/value").once("value", function (snap) {
                    totalPoints += snap.val();
                    console.log(count, badges.length)
                    if (count === badges.length) {
                        database.ref("userdata/" + getStoredUser().uid + "/points").set(totalPoints)
                        exitFunc(totalPoints);
                    }
                })
                count++;
            }

        });
    }
}