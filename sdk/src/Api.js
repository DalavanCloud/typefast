/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import type ApiOptimizer from './ApiOptimizer';
import type NodeSpec from './specs/NodeSpec';
import type Session from './Session';
import type {HttpAdapterInterface} from './http/HttpAdapterInterface';
import type {GraphVersion, RequestMethod, RequestParams} from './http/Request';

const Request = require('./http/Request');
const Response = require('./http/Response');

class Api {

  graphVersion: GraphVersion;
  httpAdapter: HttpAdapterInterface;
  optimizer: ApiOptimizer;
  session: Session;

  constructor(
    http_adapter: HttpAdapterInterface,
    optimizer: ApiOptimizer,
    session: Session,
    graph_version: GraphVersion
  ): void {
    this.httpAdapter = http_adapter;
    this.optimizer = optimizer;
    this.session = session;
    this.graphVersion = graph_version;
  }

  getHttpAdapter(): HttpAdapterInterface {
    return this.httpAdapter;
  }

  getSession(): Session {
    return this.session;
  }

  getGraphVersion(): GraphVersion {
    return this.graphVersion;
  }

  getOptimizer(): ApiOptimizer {
    return this.optimizer;
  }

  execRequest(request: Request, optimize_for_spec?: NodeSpec): Response {
    let params = request.getParams()
      .set('access_token', this.getSession().getAccessToken())
      .set('appsecret_proof', this.getSession().getApplicationSecretProof());
    if (optimize_for_spec != null) {
      const field_predictions = this.getOptimizer().getFieldPredictions(optimize_for_spec.getType());
      params = params.set('fields', field_predictions.join());
    }
    request.setParams(params);
    return this.getHttpAdapter().executeRequest(request);
  }

  call(
    path: string,
    method: RequestMethod,
    params: RequestParams,
    optimize_for_spec?: NodeSpec
  ): Response {
    return this.execRequest(new Request(this, path, method, params), optimize_for_spec);
  }
}

module.exports = Api;
