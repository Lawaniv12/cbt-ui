import { TestBed } from '@angular/core/testing';

import { PersonalityAssessmentService } from './personality-assessment.service';

describe('PersonalityAssessmentService', () => {
  let service: PersonalityAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalityAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
