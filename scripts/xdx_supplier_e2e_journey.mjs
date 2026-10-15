/** Concrete supplier business journey for an already verified Studio preview.
 * This module never opens a browser or invokes an ungoverned business write.
 */
import { start } from './xdx-supplier-e2e.mjs';

export const supplierJourneyPlan = [
  ['SUP-Q','Supplier','Query source supplier'], ['SUP-C','Supplier','Create supplier from template'],
  ['SUP-R','Supplier','Read back new supplier'], ['ADR-Q','Address','Query supplier addresses'],
  ['ADR-D','Address','Create address directly'], ['ADR-R','Address','Read back direct address'],
  ['ADR-T','Address','Create address from same-parent template'], ['ADR-TR','Address','Read back template address'],
  ['CON-Q','Contact','Query supplier contacts'], ['CON-D','Contact','Create contact directly'],
  ['CON-R','Contact','Read back direct contact'], ['CON-T','Contact','Create contact from same-parent template'],
  ['CON-TR','Contact','Read back template contact'], ['SITE-Q','Site','Query new supplier sites'],
  ['SITE-CON','Site','Attempt connected first site'],
  ['ASN-CON','Site Assignment','Connected assignment blocked by missing connected Site'],
  ['SITE-FQ','Site','Query fallback supplier sites'],
  ['SITE-T','Site','Create site and source assignments from template'], ['SITE-R','Site','Read back fallback site'],
  ['ASN-Q','Site Assignment','Query standalone assignments'], ['ASN-R','Site Assignment','Verify embedded assignment results']
].map(([id,object,title]) => ({ id, object, title, scenario: title,
  ...(id==='ASN-CON'?{dependencies:['SITE-CON']}:{}),
  expected: title, write: ['SUP-C','ADR-D','ADR-T','CON-D','CON-T','SITE-T'].includes(id) }));

const escaped = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const canonical = value => String(value ?? '').trim();
// Native AX contains an echoed User message and unrelated sibling widgets.
// Only the response owner's subtree can supply business observations.
function responseText(text) {
  const lines=String(text).split(/\r?\n/);
  const owners=lines.map((line,index)=>({line,index,match:/^(\s*)\d+ container XDX Supplier Conversation\s*$/.exec(line)})).filter(x=>x.match);
  if(owners.length!==1) return '';
  const owner=owners[0],indent=owner.match[1].length;
  let end=owner.index+1;
  while(end<lines.length && (!lines[end].trim() || /^\s*/.exec(lines[end])[0].length>indent))end++;
  return lines.slice(owner.index,end).join('\n');
}
const fieldLabels = {Supplier:['Supplier Name'],SupplierType:['Supplier Type'],
  BusinessRelationship:['Business Relationship'],TaxOrganizationType:['Tax Organization Type'],
  SupplierId:['Supplier ID'],SupplierNumber:['Supplier Number'],
  AddressName:['Address Name','Name'],CountryCode:['Country Code','Country'],AddressLine1:['Address Line 1'],
  PostalCode:['Postal Code'],FirstName:['First Name'],LastName:['Last Name'],
  SupplierSite:['Supplier Site','Site name'],ProcurementBUId:['Procurement BU ID','Procurement Business Unit'],
  SupplierAddressName:['Supplier Address Name','Address name'],SitePurposePurchasingFlag:['Purchasing purpose','Site Purpose Purchasing Flag']};
function field(text, name) {
  text=responseText(text);
  if(['SupplierSite','ProcurementBUId','SupplierAddressName','SitePurposePurchasingFlag'].includes(name) && /text Proposed site:/.test(text))
    text=text.split(/\n[^\n]*text Parent supplier:/)[0];
  const key = escaped(name);
  const json = text.match(new RegExp('"'+key+'"\\s*:\\s*(?:"([^"\\n]+)"|([0-9]+|true|false))','i'));
  if (json) return json[1] ?? json[2];
  // AX lines prepend numeric IDs and roles; preserve the actual field value.
  const line = text.match(new RegExp('(?:^|\\n)[^\\n]*?\\b'+key+'\\s*:\\s*([^\\n]+)','i'));
  if(line) {
    const value=line[1].trim().split(/,\s+(?=[A-Za-z][A-Za-z ]+:)/)[0].replace(/\s+\(Code:\s*[^)]+\)\s*$/i,'');
    if(/^(?:SupplierNumber|Supplier Number)$/i.test(name) && /^[1-9][0-9]*\)$/.test(value))return value.slice(0,-1);
    if(name==='Country' && /\(([A-Z]{2})\)$/.test(value))return /\(([A-Z]{2})\)$/.exec(value)[1];
    if(name==='Procurement Business Unit' && /\(ID:\s*([1-9][0-9]{0,17})\)$/.test(value))return /\(ID:\s*([1-9][0-9]{0,17})\)$/.exec(value)[1];
    return name==='Supplier'?value.replace(/\s+\((?:Supplier )?Number:\s*[1-9][0-9]*\)$/i,''):value;
  }
  for(const label of fieldLabels[name] || []) {
    const value=field(text,label);
    if(value!==undefined)return name==='SitePurposePurchasingFlag' && /^(Yes|No)$/i.test(value)?String(/^Yes$/i.test(value)):value;
  }
  if(name==='SupplierNumber') {
    const parent=text.match(/\bSupplier:\s*[^\n]+\(Number:\s*([1-9][0-9]{0,17})\)/i);
    if(parent)return parent[1];
  }
  const contactParent=text.match(/Proposed contact for supplier (.+?) \(Supplier Number:\s*([1-9][0-9]{0,17})\), mode:/i);
  if(contactParent && name==='Supplier')return contactParent[1];
  if(contactParent && name==='SupplierNumber')return contactParent[2];
  return undefined;
}
function currentControl(text, action) {
  text=responseText(text);
  const matches = [...text.matchAll(new RegExp(action+' request ([A-Za-z0-9][A-Za-z0-9_-]{0,95}) revision ([1-9][0-9]{0,15})','g'))];
  const distinct = [...new Map(matches.map(m => [m[1]+':'+m[2],m])).values()];
  if (distinct.length !== 1) throw Error('Exactly one visible '+action+' request/revision required');
  return { command: distinct[0][0], requestId: distinct[0][1], revision: Number(distinct[0][2]) };
}
const idAliases = {
  SupplierId: ['SupplierId','Created supplier ID','Supplier ID'],
  SupplierNumber: ['SupplierNumber','Supplier number'],
  SupplierAddressId: ['SupplierAddressId','Created address ID'],
  SupplierContactId: ['SupplierContactId','Created contact ID'],
  SupplierSiteId: ['SupplierSiteId','Site ID'], AssignmentId: ['AssignmentId','Assignment ID']
};
function observedId(text, key) {
  for (const label of idAliases[key] || [key]) {
    const value = field(text,label);
    if (value && /^[1-9][0-9]{0,17}$/.test(value)) return value;
  }
  return null;
}

/** Pure actual-response parser, also used by focused local fixture checks. */
export function parseSupplierResponse(state, names=[]) {
  const response=responseText(state);
  return { response, fields:Object.fromEntries(names.map(name=>[name,field(state,name)])),
    assignmentPairs:[...response.matchAll(/text ClientBUId:\s*([1-9][0-9]{0,17}),\s*BillToBUId:\s*([1-9][0-9]{0,17})/g)].map(m=>({ClientBUId:m[1],BillToBUId:m[2]})),
    acceptedAssignments:[...response.matchAll(/text Assignment ID:\s*([1-9][0-9]{0,17})[\s\S]*?text Client BU ID:\s*([1-9][0-9]{0,17})[\s\S]*?text Bill To BU ID:\s*([1-9][0-9]{0,17})[\s\S]*?text Verification status:\s*(verified)/g)].map(m=>({AssignmentId:m[1],ClientBUId:m[2],BillToBUId:m[3],verification:m[4]})),
    emptyCollections:{contacts:/\bNo matching contacts on this page\./.test(response) && /\bNo contacts found\./.test(response),
      sites:/\bNo matching sites on this page\./.test(response) && /\bNo site records found for this supplier\./.test(response),
      addresses:field(state,'Items')==='none' && field(state,'Has more')==='false' && /\bNo matching addresses on this page\./.test(response)},
    ids:Object.fromEntries(Object.keys(idAliases).map(key=>[key,observedId(state,key)])) };
}

/** Native rendered verification is distinct from raw BO input/output proof.
 * Every returned value comes from the captured response, never test inputs. */
export function observeNativeSupplierCapture(capture) {
  const names=[...Object.keys(fieldLabels),'Email','City','State','AddressPurposeOrderingFlag'];
  const parsed=parseSupplierResponse(capture.state,names),text=parsed.response;
  const readbackVerified=/\b(?:Supplier|Address|Contact|Site) created and independently verified\./.test(text) &&
    /text (?:Verification(?: status)?|Attempt verification): verified\b/i.test(text);
  const parentId=observedId(capture.state,'Parent supplier ID') ?? (/Site created and independently verified\./.test(text)?parsed.ids.SupplierId:null);
  const siteRows=[...text.matchAll(/text [^\n]+ - Site ID:\s*([1-9][0-9]{0,17}), Address:\s*[^\n]+, Procurement BU:\s*[^\n]+/g)];
  const sitePage=/text Supplier sites\./.test(text) && siteRows.length>0 &&
    new Set(siteRows.map(m=>m[1])).size===siteRows.length &&
    /(?:more sites available[\s\S]*Next sites page|No more (?:sites|results))/i.test(text);
  return {fields:{...parsed.fields,parentSupplierName:field(capture.state,'Parent supplier') ?? field(capture.state,'Supplier')},
    ids:{...parsed.ids,parentSupplierId:parentId,parentSupplierNumber:parsed.ids.SupplierNumber},
    assertions:[],readbackVerified,readbackEvidence:capture.semanticPath,
    relationshipVerified:readbackVerified && Boolean(parentId),relationshipEvidence:capture.semanticPath,
    collectionVerified:sitePage,itemCount:siteRows.length,collectionEvidence:capture.semanticPath,
    assignments:parsed.acceptedAssignments,assignmentsVerified:readbackVerified && parsed.acceptedAssignments.length>0,
    assignmentEvidence:capture.semanticPath,boundary:'native-ui-rendered-verification',rawBoMetadataVerified:false};
}

export function assessStandaloneAssignmentQuery(capture) {
  const parsed=parseSupplierResponse(capture.state);
  if(/assignment[^.\n]*(?:unsupported|not supported)|(?:unsupported|not supported)[^.\n]*assignment|cannot (?:show|retrieve|query) assignments/i.test(parsed.response))
    return {status:'BLOCKED',actual:'Application explicitly reported unsupported standalone assignment query'};
  if(parsed.acceptedAssignments.length>0)return {status:'PASS',actual:'Assignment records returned'};
  return {status:'FAIL',actual:'Expected assignment records; actual response returned another route or omitted assignment records'};
}

export function assessAcceptedSiteReadback({pending,completion,detail}) {
  const proof=observeNativeSupplierCapture(completion),actual=parseSupplierResponse(detail.state);
  return Object.entries(pending.payload).map(([name,expected])=>({name:name+' equals reviewed value',expected,
    actual:field(detail.state,name),passed:canonical(field(detail.state,name))===canonical(expected),evidence:detail.semanticPath})).concat([
    {name:'Accepted Site and ordinary readback have same generated ID',passed:actual.ids.SupplierSiteId===pending.createdId,evidence:detail.semanticPath},
    {name:'Ordinary readback parent number/name matches reviewed parent',passed:canonical(field(detail.state,'SupplierNumber'))===canonical(pending.parent.number) && canonical(field(detail.state,'Supplier'))===canonical(pending.parent.name),evidence:detail.semanticPath},
    {name:'Original native completion independently verified Site and parent',passed:proof.readbackVerified && proof.relationshipVerified && (!pending.parent.id || proof.ids.parentSupplierId===pending.parent.id),evidence:completion.semanticPath}
  ]);
}

export function assessRetainedAssignments({completion,expected,siteId}) {
  const parsed=parseSupplierResponse(completion.state),actual=parsed.acceptedAssignments;
  return Boolean(siteId && parsed.ids.SupplierSiteId===siteId && Array.isArray(expected) && actual.length>0 &&
    actual.length===expected.length && actual.every((a,i)=>a.verification==='verified' && canonical(a.ClientBUId)===canonical(expected[i].ClientBUId) && canonical(a.BillToBUId)===canonical(expected[i].BillToBUId)));
}

/**
 * preAction receives every prospective UI request, including its frozen write
 * identity, and must return true after the actual learning/authority gate.
 * settle(tab) must observe completion, not merely the first streamed rows.
 * inspect may return structured observed fields/IDs/assertions from the current
 * screenshot/AX and a retained trace; never return intended values as observations.
 */
export async function runSupplierJourney({ tab, repoRoot, runDir, target,
  preAction, hostFinalize, settle, inspect, sourceSupplier, fallbackSite,
  token, resume = false, retries = {}, onFailure, ...runnerOptions }) {
  if ([preAction,hostFinalize,settle,onFailure].some(fn=>typeof fn!=='function'))
    throw Error('Explicit preAction, hostFinalize, onFailure and observed settle callbacks required');
  if (!sourceSupplier?.number || !sourceSupplier?.name)
    throw Error('Current verified source supplier number and name required');
  if (['SupplierType','BusinessRelationship','TaxOrganizationType'].some(k=>typeof sourceSupplier.classifications?.[k]!=='string' || !sourceSupplier.classifications[k].trim()))
    throw Error('All three source classification fields must be independently observed before creating a supplier');
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(token || '')) throw Error('Explicit stable unique run token required');
  const session = await start({ ...runnerOptions, tab, repoRoot, runDir, target,
    resume, finalize: hostFinalize, plan: supplierJourneyPlan });
  const state = session.result.records;
  const source = { number: String(sourceSupplier.number), id: sourceSupplier.id == null?null:String(sourceSupplier.id), name: sourceSupplier.name };
  const supplierName = 'XDX E2E '+token;
  let latest = null;
  const observed = async capture => {
    const native=observeNativeSupplierCapture(capture),extension=typeof inspect==='function'?await inspect({capture,session}):{};
    return {...native,...extension,fields:{...native.fields,...extension?.fields},ids:{...native.ids,...extension?.ids},
      assertions:[...native.assertions,...(extension?.assertions||[])]};
  };
  async function request(id, prompt, stage, reservation) {
    const allowed = await preAction({ id, prompt, stage, target, reservation, session });
    if (allowed !== true) throw Error('Pre-action gate did not authorize this request');
    latest = await session.request({ id, prompt, stage, reservation,
      submit: currentTab => currentTab.playwright.getByRole('textbox').press('Enter'), settle });
    return latest;
  }
  function checks(capture, values, extras = [], fields = {}) {
    return Object.entries(values).map(([key,value]) => ({
      name: key+' equals expected', passed: canonical(field(capture.state,key)) === canonical(value),
      expected: value, actual: fields[key] ?? field(capture.state,key) ?? null, evidence: capture.semanticPath
    })).map(a=>({...a,passed:canonical(a.actual)===canonical(a.expected)})).concat(extras);
  }
  async function outcome(id,capture,assertions,recordIds={},fallback=false) {
    const valid = assertions.length > 0 && assertions.every(a=>a.passed===true && a.evidence);
    await session.record({ id, status: valid?'PASS':'FAIL', actual: valid?'Observed assertions passed':'Required observed assertions failed or missing',
      assertions, recordIds, fallback, failureKind: valid?undefined:'assertion' });
    if (!valid) await onFailure({ id, kind:'assertion', capture, assertions, session });
  }
  const parent = () => state.newSupplierNumber ? { number:state.newSupplierNumber,id:state.newSupplierId,name:supplierName,fallback:false } : { ...source,fallback:true };
  async function blocked(id,reason) {
    const capture = await session.capture({id,stage:'blocked',notes:reason});
    await session.record({id,status:'BLOCKED',actual:reason,assertions:[],fallback:false});
    await onFailure({id,kind:'capability-or-dependency',capture,reason,session});
  }
  async function query(id,prompt,expected,{fallback=false}={}) {
    const capture = await request(id,prompt,'query');
    const extra = await observed(capture);
    const assertions=checks(capture,expected,extra.assertions,extra.fields);
    if(id==='SUP-Q')assertions.push({name:'Known-hit source supplier name and displayed number',passed:
      new RegExp(escaped(source.name)+',\\s+Supplier Number:\\s*'+escaped(source.number)+'(?:,|$)','i').test(responseText(capture.state)),evidence:capture.semanticPath});
    if(['ADR-R','ADR-TR','CON-R','CON-TR','SITE-R'].includes(id)) {
      const expectedNumber=id==='SITE-R'?source.number:parent().number;
      assertions.push({name:'Ordinary native detail parent number',passed:canonical(field(capture.state,'SupplierNumber'))===canonical(expectedNumber),evidence:capture.semanticPath});
    }
    if(!Object.keys(expected).length) {
      const expectedNumber=id==='SITE-FQ'?source.number:parent().number;
      assertions.push({name:'Native collection parent number',passed:canonical(field(capture.state,'SupplierNumber'))===canonical(expectedNumber),evidence:capture.semanticPath});
      const parsed=parseSupplierResponse(capture.state);
      const empty=id==='CON-Q'?parsed.emptyCollections.contacts:
        id==='ADR-Q'?parsed.emptyCollections.addresses:parsed.emptyCollections.sites;
      const populated=extra.collectionVerified===true && Number.isInteger(extra.itemCount) && extra.itemCount>0;
      assertions.push({name:'Observed empty or verified populated collection envelope',passed:empty||populated,evidence:extra.collectionEvidence||capture.semanticPath});
    }
    await outcome(id,capture,assertions,{},fallback);
    return capture;
  }
  async function transaction(id,prompt,payload,key,recordPrefix,p) {
    const prepared = await request(id,prompt,'prepare');
    const review = currentControl(prepared.state,'Review');
    const reviewCapture = await request(id,review.command,'review');
    const confirm = currentControl(reviewCapture.state,'Confirm');
    if (review.requestId !== confirm.requestId || review.revision !== confirm.revision)
      throw Error('Review/Confirm request identity changed');
    const facts = await observed(reviewCapture);
    const actualPayload = Object.fromEntries(Object.keys(payload).map(k=>[k, facts.fields?.[k] ?? field(reviewCapture.state,k)]));
    if (Object.entries(payload).some(([k,v])=>canonical(actualPayload[k])!==canonical(v)))
      throw Error('Visible reviewed payload does not match every intended field; no Confirm submitted');
    if(p && (canonical(facts.ids?.parentSupplierNumber ?? field(reviewCapture.state,'SupplierNumber'))!==canonical(p.number) ||
        canonical(facts.fields?.parentSupplierName ?? field(reviewCapture.state,'Supplier'))!==canonical(p.name)))
      throw Error('Reviewed native parent number/name unavailable or mismatched; no Confirm submitted');
    let reservationPayload=payload;
    if(key==='SupplierSiteId') {
      if(!Array.isArray(fallbackSite?.assignments))throw Error('Verified exact source assignment pairs required before Site Confirm');
      const pairs=fallbackSite.assignments.map(pair=>({ClientBUId:canonical(pair.ClientBUId),BillToBUId:canonical(pair.BillToBUId)}));
      const actualPairs=parseSupplierResponse(reviewCapture.state).assignmentPairs;
      if(JSON.stringify(actualPairs)!==JSON.stringify(pairs) || canonical(field(reviewCapture.state,'Write count'))!==String(1+pairs.length))
        throw Error('Reviewed assignment pairs/write count differ; no Site Confirm submitted');
      reservationPayload={site:payload,assignments:pairs};
    }
    const result = await request(id,confirm.command,'confirm',{
      operationId:id+'-'+token,requestId:confirm.requestId,revision:confirm.revision,payload:reservationPayload
    });
    const proof = await observed(result), created = proof.ids?.[key] ?? observedId(result.state,key);
    const recordIds = {};
    if (created) {
      recordIds[recordPrefix+'Id']=created;
      if(key==='SupplierSiteId') {
        const assignments=parseSupplierResponse(result.state).acceptedAssignments;
        recordIds.fallbackAssignments=assignments;
        recordIds.fallbackAssignmentEvidence=result.semanticPath;
        recordIds.siteCompletionCapture=result;
        recordIds.pendingSiteVerification={id,payload,parent:p,createdId:created};
      }
      if (key==='SupplierId') {
        const number=proof.ids?.SupplierNumber ?? observedId(result.state,'SupplierNumber');
        if (number) recordIds.newSupplierNumber=number;
      }
      await session.reconcile({id,disposition:'accepted',recordIds,evidence:result.semanticPath});
    } else await session.reconcile({id,disposition:'uncertain',evidence:result.semanticPath});
    // The native Site completion omits BU/address/purpose fields. Keep this
    // accepted write pending until the already-planned ordinary Site read.
    if(key==='SupplierSiteId' && created)return result;
    const assertions = checks(result,payload,proof.assertions,proof.fields);
    assertions.push({name:'Created ID observed',passed:Boolean(created),evidence:result.semanticPath});
    // A verified status alone is not field equality; all intended fields above
    // plus independently observed readback evidence are mandatory.
    assertions.push({name:'Independent readback observed',passed:proof.readbackVerified===true,
      evidence:proof.readbackEvidence || result.semanticPath});
    if(p) {
      const visibleInternalParent=proof.ids?.parentSupplierId ?? observedId(result.state,'Parent supplier ID') ?? (key==='SupplierSiteId'?observedId(result.state,'SupplierId'):null);
      assertions.push({name:'Created native parent identity matches',passed:
        key==='SupplierSiteId'?Boolean(p.id && canonical(visibleInternalParent)===canonical(p.id)):
          canonical(proof.ids?.parentSupplierNumber ?? field(result.state,'SupplierNumber'))===canonical(p.number) &&
          canonical(proof.fields?.parentSupplierName ?? field(result.state,'Parent supplier') ?? field(result.state,'Supplier'))===canonical(p.name),evidence:result.semanticPath});
      assertions.push({name:'Independent parent relationship verified',passed:proof.relationshipVerified===true &&
        (!p.id || canonical(visibleInternalParent)===canonical(p.id)),evidence:proof.relationshipEvidence||result.semanticPath});
    }
    await outcome(id,result,assertions,recordIds,p?.fallback===true);
    return result;
  }
  const address = { AddressName:'XDX '+token+' Direct',CountryCode:'US',AddressLine1:'2300 GREENLAWN BLVD',City:'ROUND ROCK',State:'TX',PostalCode:'78664',Email:'xdx.'+token.toLowerCase()+'.address@example.invalid',AddressPurposeOrderingFlag:true };
  const contact = {FirstName:'XDX',LastName:'E2E'+token,Email:'xdx.'+token.toLowerCase()+'.contact@example.invalid'};
  async function readSiteAndResolveAcceptedCreate() {
    if(!state.fallbackSiteId)return blocked('SITE-R','Created fallback Site identity unavailable');
    const detail=await query('SITE-R','Show site details for site ID '+state.fallbackSiteId+' for supplier number '+source.number,
      {...fallbackSite.payload,SupplierSiteId:state.fallbackSiteId,SupplierSite:'XDX '+token+' Site'},{fallback:true});
    const pending=state.pendingSiteVerification,completion=state.siteCompletionCapture;
    if(!pending || !completion)return;
    const assertions=assessAcceptedSiteReadback({pending,completion,detail});
    await outcome(pending.id,detail,assertions,{pendingSiteVerification:null},true);
  }
  async function verifyRetainedAssignments() {
    const completion=state.siteCompletionCapture;
    if(!completion)return blocked('ASN-R','Original Site completion capture unavailable; no assignment verification can be claimed');
    const {state:omitted,...reference}=completion;
    const step=session.result.steps.find(s=>s.id==='ASN-R');
    if(!step.captures.some(c=>c.path===reference.path))step.captures.push({...reference,stage:'retained-assignment-completion',title:'Site assignment completion evidence',notes:'Original accepted Site response; no new request or verification was performed'});
    const verified=assessRetainedAssignments({completion,expected:fallbackSite?.assignments,siteId:state.fallbackSiteId});
    await outcome('ASN-R',completion,[{name:'Assignment IDs and both BU fields independently read back in original Site completion',passed:verified&&Boolean(state.fallbackSiteId),evidence:completion.semanticPath}],{},true);
  }
  const steps = {
    'SUP-Q':()=>query('SUP-Q','Find a supplier like '+source.name,{SupplierNumber:source.number}),
    'SUP-C':()=>transaction('SUP-C','Create supplier based on supplier number '+source.number+' with new name '+supplierName,
      {Supplier:supplierName,...sourceSupplier.classifications},'SupplierId','newSupplier'),
    'SUP-R':()=>state.newSupplierNumber ? query('SUP-R','Show supplier details for supplier number '+state.newSupplierNumber,{Supplier:supplierName,SupplierNumber:state.newSupplierNumber,...sourceSupplier.classifications}) : blocked('SUP-R','New supplier not observed; no connected readback possible'),
    'ADR-Q':()=>query('ADR-Q','Show addresses for supplier number '+parent().number,{},parent()),
    'ADR-D':()=>transaction('ADR-D','Create address for supplier number '+parent().number+' with '+Object.entries(address).filter(([k])=>k!=='AddressPurposeOrderingFlag').map(([k,v])=>k+' '+v).join(', '),address,'SupplierAddressId','directAddress',parent()),
    'ADR-R':()=>state.directAddressId ? query('ADR-R','Show address details for address ID '+state.directAddressId+' for supplier number '+parent().number,Object.fromEntries(Object.entries(address).filter(([k])=>k!=='AddressPurposeOrderingFlag')),parent()) : blocked('ADR-R','Direct address identity unavailable'),
    'ADR-T':()=>state.directAddressId ? transaction('ADR-T','Create address for supplier number '+parent().number+' based on address ID '+state.directAddressId+' with new name XDX '+token+' Template and Email xdx.'+token.toLowerCase()+'.address.template@example.invalid',{...address,AddressName:'XDX '+token+' Template',Email:'xdx.'+token.toLowerCase()+'.address.template@example.invalid'},'SupplierAddressId','templateAddress',parent()) : blocked('ADR-T','Same-parent source address unavailable'),
    'ADR-TR':()=>state.templateAddressId ? query('ADR-TR','Show address details for address ID '+state.templateAddressId+' for supplier number '+parent().number,{AddressName:'XDX '+token+' Template',Email:'xdx.'+token.toLowerCase()+'.address.template@example.invalid'},parent()) : blocked('ADR-TR','Template address identity unavailable'),
    'CON-Q':()=>query('CON-Q','Show contacts for supplier number '+parent().number,{},parent()),
    'CON-D':()=>transaction('CON-D','Create contact for supplier number '+parent().number+' with '+Object.entries(contact).map(([k,v])=>k+' '+v).join(', '),contact,'SupplierContactId','directContact',parent()),
    'CON-R':()=>state.directContactId ? query('CON-R','Show contact details for contact ID '+state.directContactId+' for supplier number '+parent().number,{...contact},parent()) : blocked('CON-R','Direct contact identity unavailable'),
    'CON-T':()=>state.directContactId ? transaction('CON-T','Create contact for supplier number '+parent().number+' based on contact ID '+state.directContactId+' with LastName E2E'+token+'Template and Email xdx.'+token.toLowerCase()+'.contact.template@example.invalid',{...contact,LastName:'E2E'+token+'Template',Email:'xdx.'+token.toLowerCase()+'.contact.template@example.invalid'},'SupplierContactId','templateContact',parent()) : blocked('CON-T','Same-parent source contact unavailable'),
    'CON-TR':()=>state.templateContactId ? query('CON-TR','Show contact details for contact ID '+state.templateContactId+' for supplier number '+parent().number,{LastName:'E2E'+token+'Template',Email:'xdx.'+token.toLowerCase()+'.contact.template@example.invalid'},parent()) : blocked('CON-TR','Template contact identity unavailable'),
    'SITE-Q':()=>query('SITE-Q','Show sites for supplier number '+parent().number,{},parent()),
    'SITE-CON':async()=>{if(state.newSupplierNumber)await request('SITE-CON','Create site for supplier number '+state.newSupplierNumber+' based on selected site with new name XDX '+token+' Connected','prepare');await blocked('SITE-CON','Current same-parent template-only Site route cannot bootstrap first Site or bind a different newly created Address');},
    'ASN-CON':async()=>{
      const dependency=session.result.steps.find(s=>s.id==='SITE-CON');
      const original=dependency?.captures.at(-1),step=session.result.steps.find(s=>s.id==='ASN-CON');
      if(original)step.captures.push({...original,stage:'connected-site-dependency',title:'Connected assignment dependency blocked',notes:'Original connected Site evidence reused; no Assignment request or write was submitted'});
      await session.record({id:'ASN-CON',status:'BLOCKED',actual:'Connected Assignment cannot execute because its connected Site was not created. Original SITE-CON evidence retained; fallback assignment coverage remains separate.'});
    },
    'SITE-FQ':()=>query('SITE-FQ','Show sites for supplier number '+source.number,{}, {fallback:true}),
    'SITE-T':()=>fallbackSite?.id && fallbackSite?.payload ? transaction('SITE-T','Create a new site for supplier number '+source.number+' based on site ID '+fallbackSite.id+' with new name XDX '+token+' Site',{...fallbackSite.payload,SupplierSite:'XDX '+token+' Site'},'SupplierSiteId','fallbackSite',{...source,fallback:true}) : blocked('SITE-T','Current active same-parent purchasing Site/address/BU/assignment source not supplied'),
    'SITE-R':readSiteAndResolveAcceptedCreate,
    'ASN-Q':async()=>{const capture=await request('ASN-Q','Show assignments for site ID '+(state.fallbackSiteId || fallbackSite?.id || 'unresolved')+' for supplier number '+source.number,'query');const disposition=assessStandaloneAssignmentQuery(capture);if(disposition.status==='PASS')await outcome('ASN-Q',capture,[{name:'Actual assignment records returned',passed:true,evidence:capture.semanticPath}],{},true);else {await session.record({id:'ASN-Q',...disposition,failureKind:disposition.status==='FAIL'?'wrong-route':'capability'});await onFailure({id:'ASN-Q',kind:disposition.status==='FAIL'?'wrong-route':'capability',capture,session});}},
    'ASN-R':verifyRetainedAssignments
  };
  try {
    for(const spec of supplierJourneyPlan) {
      const prior=session.result.steps.find(s=>s.id===spec.id);
      if(prior.status==='PASS')continue;
      if(state.pendingSiteVerification?.id===spec.id && prior.reservations.some(r=>r.disposition==='accepted'))continue;
      if(prior.reservations.some(r=>r.disposition!=='not-created')) {await blocked(spec.id,'Accepted/uncertain write preserved; reconcile using retained IDs, never replay');continue;}
      try {await session.begin(spec.id,retries[spec.id]);await steps[spec.id]();}
      catch(error) {
        const cap=await session.capture({id:spec.id,stage:'failure',notes:String(error.message)}).catch(()=>null);
        await session.record({id:spec.id,status:'FAIL',actual:String(error.message),failureKind:'execution'});
        await onFailure({id:spec.id,kind:'execution',error,capture:cap,session});
      }
    }
  } finally {await session.finish();}
  return session.result;
}

/** Documented readiness wait used after Enter; caller may provide a stricter
 * tenant-specific observed settle. Full capture follows completion. */
export async function settleSupplierPreview(tab) {
  const deadline=Date.now()+45000;
  let pair, observedProcessing=false;
  do {
    // Each supported AX observation is awaited; readiness is observed from the
    // actual surface, never inferred from a fixed sleep or the first locator.
    pair=await tab.getAXStateAndScreenshot({disableDiffing:true,emit:false});
    const ready=/text entry area \(settable\)/.test(pair.state) &&
        !/Synthesizing results|Generating response|Validating hypotheses|Executing algorithms/i.test(pair.state);
    if(!ready) observedProcessing=true;
    if(observedProcessing && ready) return pair;
  } while(Date.now()<deadline);
  throw Error('Preview did not settle; preserve pending request and reconcile rather than resubmit');
}
