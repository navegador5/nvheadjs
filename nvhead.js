const util = require("util")
const tlist = require("./tlist")
const Tlist = require("./tlist").Tlist

/**
 * t2s
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var t = [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ]
 *     ////
 *     > t2s(t)
 *     'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7'
 *
 * @param {Array} t - tuple
 * @return {String} s - string
 */

function t2s(t) {
    return(t[0]+": "+t[1])
}

/**
 * s2t
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var s = 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7'
 *     ////
 *     > s2t(s)
 *     [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ]
 *
 * @param {Object} obj - object
 * @return {Array} tl - [t0,t1,...tk...,tn]
 */


function s2t(s) {
    let regex = /(.*?): (.*)/g
    let t = regex.exec(s)
    t = t.slice(1,3)
    return(t)
}


/**
 * tl2sl
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var tl = [["k0","v0"],["k1","v1"],["k2","v2"]]
 *  
 *     ////
 *     > tl2sl(tl)
 *     [ 'k0: v0', 'k1: v1', 'k2: v2' ]
 *
 *
 * @param {Array} tl - tlist
 * @return {Array} sl - slist
 */

function tl2sl(tl) {
    return(Array.from(tl.map(t2s)))
}

/**
 * sl2tl
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var sl = [ 'k0: v0', 'k1: v1', 'k2: v2' ]
 *     ////
 *     > sl2tl(sl)
 *     [ [ 'k0', 'v0' ], [ 'k1', 'v1' ], [ 'k2', 'v2' ] ]
 *
 * @param {Array} sl - slist
 * @return {Array} tl - tlist
 */


function sl2tl(sl) {
    return(sl.map(s2t))
}


/**
 * sl2s
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var sl = [ 'k0: v0', 'k1: v1', 'k2: v2' ]
 *     ////
 *     > sl2s(sl)
 *     'k0: v0\r\nk1: v1\r\nk2: v2'
 *
 * @param {Array} sl - slist
 * @return {String} s - string
 */


function sl2s(sl) {
    return(sl.join("\r\n"))
}


/**
 * s2sl
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     var s = 'k0: v0\r\nk1: v1\r\nk2: v2'
 *     ////
 *     > s2sl(s)
 *     [ 'k0: v0', 'k1: v1', 'k2: v2' ]
 *
 * @param {String} s - string
 * @return {Array} sl - slist
 */

function s2sl(s) {
    s = s.replace(/\r\n/g,"\u0000")
    s = s.replace(/\n/g,"\u0000")
    s = s.replace(/\r/g,"\u0000")
    return(s.split("\u0000"))
}

/**
 * isHeadEntryTuple
 *
 * <pre>
 *     [key,value]
 *     key is string
 *     vale is sttring
 *     key can NOT be empty 
 *     value cant be empty
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *
 *     ////
 *     > isHeadEntryTuple(["k","v"])
 *     true
 *     > isHeadEntryTuple(["","v"])
 *     false
 *     > isHeadEntryTuple(["k",""])
 *     true
 *
 * @param {Object} obj - object
 * @return {Boolean} cond - true or false
 */


function isHeadEntryTuple(obj) {
    if(tlist.isTuple(obj)) {
        let cond0 = util.isString(obj[0])
        let cond1 = util.isString(obj[1])
        let cond2 = (obj[0].trim().length > 0)
        return(cond0 && cond1 && cond2)
    } else {
        return(false)
    }
}


/**
 * isHeadEntryStr
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *
 *     ////
 *     > isHeadEntryStr("k:v")
 *     false
 *     > isHeadEntryStr("k: v")
 *     true
 *     > isHeadEntryStr(": v")
 *     false
 *     > isHeadEntryStr("k: ")
 *     true
 *     >
 *
 * @param {String} s - string
 * @return {Boolean} cond - true or false
 */


function isHeadEntryStr(s) {
    try {
        let t = s2t(s)
        return(t[0].trim().length>0)
    } catch (e) {
        return(false)
    }
}

/**
 * isSlist
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     
 *     ////
 *     > isSlist(["k0: v0","k1: v1","k2: v2"])
 *     true
 *     > isSlist(["k0:v0","k1: v1","k2: v2"])
 *     false
 *
 * @param {Object} obj - object
 * @return {Boolean} cond - true or false
 */

function isSlist(obj) {
    if(util.isArray(obj)) {
        let lngth0 = obj.length
        let lngth1 = obj.filter(isHeadEntryStr).length
        return(lngth0 === lngth1)
    } else {
        return(false)
    }
}

/**
 * isHeadStr
 *
 * <pre>
 * </pre>
 *
 * @example
 * term
 *
 *      //prototype
 *
 *     ////
 *
 *     //function
 *     > isHeadStr('k0: v0\r\nk1: v1\r\nk2: v2')
 *     true
 *     ////
 *
 * @param {Object} obj - object
 * @return {Array} tl - [t0,t1,...tk...,tn]
 */

function isHeadStr(s) {
    if(util.isString(s)) {
        let sl = s2sl(s)
        return(isSlist(sl))
    } else {
        return(false)
    }
}


function constructor_(obj) {
    if(util.isString(obj)) {
        obj = sl2tl(s2sl(obj))
    } else if(isSlist(obj)) {
        obj = sl2tl(obj)
    } else {
        obj = obj
    }
    return(obj)
}


/**
 * Head
 *
 */



class Head extends Tlist {
    /**
     * constructor
     * 
     * <pre>
     *     Do NOT use new Head()!!!!
     *     because  Head-extends-Tlist, Tlist-extends-Array
     *     and constructor-in-Head is overwrited
     *     some method-of-Array will retrigger rewrited-constructor-function,such as splice
     *         concat,map...
     *     so use Head.getInstance() to get a new instance, it has a label _firstInit to 
     *         indicate  if this is the first-init, the-rewrited-constructor-function  will be trigged
     *         if NOT the first-init, the default-constructor-function  will be trigged
     * </pre>
     *
     * @example
     * term
     *
     *      //prototype
     *     var hd = Head.getInstance()
     *     hd
     *     var hd = Head.getInstance("k0: v0\r\nk1: v1")
     *     hd
     *     var hd = Head.getInstance(["k0: v0","k1: v1"])
     *     hd
     *     var hd = Head.getInstance("k0","v0","k1","v1")
     *     hd
     *     
     *     ////
     *    > var hd = Head.getInstance()
     *    undefined
     *    > hd
     *    Head []
     *    > var hd = Head.getInstance("k0: v0\r\nk1: v1")
     *    undefined
     *    > hd
     *    Head [ [ 'k0', 'v0' ], [ 'k1', 'v1' ] ]
     *    > var hd = Head.getInstance(["k0: v0","k1: v1"])
     *    undefined
     *    > hd
     *    Head [ [ 'k0', 'v0' ], [ 'k1', 'v1' ] ]
     *    > var hd = Head.getInstance("k0","v0","k1","v1")
     *    undefined
     *    > hd
     *    Head [ [ 'k0', 'v0' ], [ 'k1', 'v1' ] ]
     *    >
     *
     *     //function
     *
     *     ////
     *
     * @param {Object} obj - object
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    static getInstance(...items) {
        //this here  pointed to Head,  not any instance
        this._firstInit = true
        let rslt = new this(...items)
        this._firstInit = false
        return(rslt)
    }
    constructor(...items) {
        if(Head._firstInit){
            if(items.length === 0) {
                items = items || []
            } else if(items.length === 1) {
                let item = items[0]
                items = constructor_(item)
            } else {
            }
        }
        super(...items)
    }
    /**
     * append
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     var hd = Head.getInstance()
     *     hd = hd.append("Accept-Encoding","deflate, gzip;q=1.0, *;q=0.5")
     *     ////
     *     Head [ [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ] ]
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    append(k,v) {
        let rslt = super.append(k,v)
        return(rslt)
    }
    /**
     * prepend
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.prepend("Accept","text/html")
     *     ////
     *     > hd
     *     Head [ [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ] ]
     *     > hd = hd.prepend("Accept","text/html")
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ] ]
     *     >
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    prepend(k,v) {
        let rslt = super.prepend(k,v)
        return(rslt)
    }
    /**
     * insert
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.insert("Accept-Language","zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7",1)
     *     ////
     *     
     *
     *     //function
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ] ]
     *     > hd = hd.insert("Accept-Language","zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7",1)
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ] ]
     *     >
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @param {Number} which - relative index
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    insert(k,v,which) {
        let rslt = super.insert(k,v,which)
        return(rslt)
    }
    /**
     * first
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd = hd.append("Accept","application/xml;q=0.9")
     *     hd = hd.append("Accept","text/html;q=0.8")
     *     hd
     *     hd.first("Accept")
     *
     *     ////
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'application/xml;q=0.9' ],
     *       [ 'Accept', 'text/html;q=0.8' ] ]
     *     > hd.first("Accept")
     *     [ 'Accept', 'text/html' ]
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {String} v - value
     */
    first(k) {
        return(super.getFirstK(k))
    }
    /**
     * last
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd.last("Accept")
     *
     *     ////
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'application/xml;q=0.9' ],
     *       [ 'Accept', 'text/html;q=0.8' ] ]
     *     > hd.last("Accept")
     *     [ 'Accept', 'text/html;q=0.8' ]
     *     >
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {Array} t - tuple
     * 
     */
    last(k) {
        return(super.getLastK(k))
    }
    /**
     * which
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd.which("Accept",1)
     *     ////
     *
     *     //function
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'application/xml;q=0.9' ],
     *       [ 'Accept', 'text/html;q=0.8' ] ]
     *     > hd.which("Accept",1)
     *     [ 'Accept', 'application/xml;q=0.9' ]
     *     >
     *     ////
     *
     * @param {String} k - key
     * @param {Number} which - relative index
     * @return {Array} t - tuple
     * 
     */
    which(k,which) {
        return(super.getK(k,which))
    }
    /**
     * all
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd.all("Accept")
     *     ////
     *
     *     //function
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/html' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'application/xml;q=0.9' ],
     *       [ 'Accept', 'text/html;q=0.8' ] ]
     *     > hd.all("Accept")
     *     [ [ 'Accept', 'text/html' ],
     *       [ 'Accept', 'application/xml;q=0.9' ],
     *       [ 'Accept', 'text/html;q=0.8' ] ]
     *     >
     *     ////
     *
     * @param {String} k - key
     * @return {Array} tl - tlist
     */
    all(k) {
        return(super.getAllK(k))
    }
    /**
     * setfirst
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.first("Accept")
     *     hd = hd.setfirst("Accept","application/xml")
     *     hd.first("Accept")
     *     ////
     *     > hd.first("Accept")
     *     [ 'Accept', 'application/xml' ]
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    setfirst(k,v) {
        let rslt = super.setFirst(k,v)
        return(rslt)
    }
    /**
     * setlast
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.last("Accept")
     *     hd = hd.setlast("Accept","application/xml")
     *     hd.last("Accept")
     *     ////
     *     [ 'Accept', 'application/xml' ]
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    setlast(k,v) {
        let rslt = super.setLast(k,v)
        return(rslt)
    }
    /**
     * setwhich
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.which("Accept",1)
     *     hd = hd.setwhich("Accept","text/plain",1)
     *     hd.which("Accept",1)
     *     ////
     *     > hd.which("Accept",1)
     *     [ 'Accept', 'application/xml;q=0.9' ]
     *     > hd = hd.setwhich("Accept","text/plain",1)
     *     Head [
     *       [ 'Accept', 'application/xml' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'application/xml' ] ]
     *     > hd.which("Accept",1)
     *     [ 'Accept', 'text/plain' ]
     *     >
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @param {Number} which - relative index
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    setwhich(k,v,which) {
        let rslt = super.set(k,v,which)
        return(rslt)
    }
    /**
     * setall
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.all("Accept")
     *     hd = hd.setall("Accept","text/plain")
     *     hd.all("Accept")
     *     ////
     *     > hd.all("Accept")
     *     [ [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'text/plain' ] ]
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @param {String} v - value
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    setall(k,v) {
        let rslt = super.setAll(k,v)
        return(rslt)
    }
    /**
     * rmfirst
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.rmfirst("Accept")
     *     hd
     *     ////
     *     > hd
     *     Head [
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'text/plain' ] ]
     *     > hd = hd.rmfirst("Accept")
     *     Head [
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'text/plain' ] ]
     *     > hd
     *     Head [
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', 'text/plain' ],
     *       [ 'Accept', 'text/plain' ] ]
     *     >
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    rmfirst(k) {
        let rslt = super.rmFirstK(k)
        return(rslt)
    }
    /**
     * rmlast
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.rmlast("Accept")
     *     hd
     *     ////
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    rmlast(k) {
        let rslt = super.rmLastK(k)
        return(rslt)
    }
    /**
     * rmwhich
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.rmwhich("Accept",1)
     *     hd
     *     ////
     *
     *     //function
     *
     *     ////
     *
     * @param {Object} obj - object
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    rmwhich(k,which) {
        let rslt = super.rmK(k,which)
        return(rslt)
    }
    /**
     * rmall
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd
     *     hd = hd.rmall("Accept")
     *     hd
     *     ////
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    rmall(k) {
        let rslt = super.rmAllK(k)
        return(rslt)
    }
    /**
     * rmforce
     *
     * <pre>
     *     this is for libcurl forcefully-delete
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd = hd.rmforce('Accept')
     *     hd.all("Accept")
     *     ////
     *     > hd = hd.rmforce('Accept')
     *     Head [
     *       [ 'Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7' ],
     *       [ 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5' ],
     *       [ 'Accept', '' ] ]
     *     > hd.all("Accept")
     *     [ [ 'Accept', '' ] ]
     *     >
     *
     *     //function
     *
     *     ////
     *
     * @param {String} k - key
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    rmforce(k) {
        let rslt = super.rmAllK(k)
        rslt.push([k,""])
        return(rslt)
    }
    /**
     * slist
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.slist()
     *     ////
     *     > hd.slist()
     *     [ 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7',
     *       'Accept-Encoding: deflate, gzip;q=1.0, *;q=0.5',
     *       'Accept: ' ]
     *     >
     *     //function
     *
     *     ////
     *
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    slist() {
        return(tl2sl(this))
    }
    /**
     * hdstr
     *
     * <pre>
     * </pre>
     *
     * @example
     * term
     *
     *     //prototype
     *     hd.hdstr()
     *     ////
     *     > hd.slist()
     *     'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7\r\nAccept-Encoding: deflate, gzip;q=1.0, *;q=0.5\r\nAccept: '
     *
     *     //function
     *    
     *     ////
     *
     * @return {Array} tl - [t0,t1,...tk...,tn]
     */
    hdstr() {
        return(sl2s(tl2sl(this)))
    }
}


module.exports = {
    t2s,
    s2t,
    tl2sl,
    sl2tl,
    sl2s,
    s2sl,
    isHeadEntryTuple,
    isSlist,
    isHeadStr,
    Head
}
