/*
* 处理async/await异常抛出错处
* handle 函数接受一个 Promise 对象作为参数，并总是 resolve 它，以 [data|undefined, Error|undefined] 的形式返回结果
*   如果 Promise resolve 了，handle 函数返回 [data, undefined]
*   如果 Promise reject 了，handle 函数返回 [undefined, Error]
* */

/**
 * @description ### Returns Go / Lua like responses(data, err)
 * when used with await
 *
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.all([req1, req2, req3])
 * - Example response [ [data1, data2, data3], undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.race([req1, req2, req3])
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 * @param {Promise} promise
 * @returns {Promise} [ data, undefined ]
 * @returns {Promise} [ undefined, Error ]
 */
const promiseHandle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}

export default promiseHandle
