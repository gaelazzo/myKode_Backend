'use strict';

describe('jsbackend core',
    function() {

    var timeout = 100000;

    beforeEach(function() {
    });

    it("dummy is ok",
        function () {
            const a = 5;
            expect(a).toBe(5);
        });

    it("dummy rest",
        function (done) {
            var options   = {
                url: 'http://localhost:3000/main/auth/dummy',
                type: 'GET',
                timeout : 10000,
                success: (res) => {
                    expect(res).toBeDefined();
                    expect(res.result).toBe('ok');
                    done();
                },
                error: (xhr, ajaxOptions, thrownError) => {
                    done();
                }
            };
            jQuery.ajax(options)

        }, 100000);
});
