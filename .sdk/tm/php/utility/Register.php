<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AntiPhishingDetectionUtility::setRegistrar(function (AntiPhishingDetectionUtility $u): void {
    $u->clean = [AntiPhishingDetectionClean::class, 'call'];
    $u->done = [AntiPhishingDetectionDone::class, 'call'];
    $u->make_error = [AntiPhishingDetectionMakeError::class, 'call'];
    $u->feature_add = [AntiPhishingDetectionFeatureAdd::class, 'call'];
    $u->feature_hook = [AntiPhishingDetectionFeatureHook::class, 'call'];
    $u->feature_init = [AntiPhishingDetectionFeatureInit::class, 'call'];
    $u->fetcher = [AntiPhishingDetectionFetcher::class, 'call'];
    $u->make_fetch_def = [AntiPhishingDetectionMakeFetchDef::class, 'call'];
    $u->make_context = [AntiPhishingDetectionMakeContext::class, 'call'];
    $u->make_options = [AntiPhishingDetectionMakeOptions::class, 'call'];
    $u->make_request = [AntiPhishingDetectionMakeRequest::class, 'call'];
    $u->make_response = [AntiPhishingDetectionMakeResponse::class, 'call'];
    $u->make_result = [AntiPhishingDetectionMakeResult::class, 'call'];
    $u->make_point = [AntiPhishingDetectionMakePoint::class, 'call'];
    $u->make_spec = [AntiPhishingDetectionMakeSpec::class, 'call'];
    $u->make_url = [AntiPhishingDetectionMakeUrl::class, 'call'];
    $u->param = [AntiPhishingDetectionParam::class, 'call'];
    $u->prepare_auth = [AntiPhishingDetectionPrepareAuth::class, 'call'];
    $u->prepare_body = [AntiPhishingDetectionPrepareBody::class, 'call'];
    $u->prepare_headers = [AntiPhishingDetectionPrepareHeaders::class, 'call'];
    $u->prepare_method = [AntiPhishingDetectionPrepareMethod::class, 'call'];
    $u->prepare_params = [AntiPhishingDetectionPrepareParams::class, 'call'];
    $u->prepare_path = [AntiPhishingDetectionPreparePath::class, 'call'];
    $u->prepare_query = [AntiPhishingDetectionPrepareQuery::class, 'call'];
    $u->result_basic = [AntiPhishingDetectionResultBasic::class, 'call'];
    $u->result_body = [AntiPhishingDetectionResultBody::class, 'call'];
    $u->result_headers = [AntiPhishingDetectionResultHeaders::class, 'call'];
    $u->transform_request = [AntiPhishingDetectionTransformRequest::class, 'call'];
    $u->transform_response = [AntiPhishingDetectionTransformResponse::class, 'call'];
});
